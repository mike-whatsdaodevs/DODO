const { ethers, run } = require('hardhat')

async function main() {
  await run('compile')

  let provider = ethers.provider
  let signer = provider.getSigner()

  console.log('NetWorks ID is ', (await ethers.provider.getNetwork()).chainId)
  console.log('NetWorks Name is ', (await ethers.provider.getNetwork()).name)

  const [deployer] = await ethers.getSigners()

  console.log('deployer:' + deployer.address)
  const network = (await ethers.provider.getNetwork()).chainId;
  console.log(network);

  let index0Tokens = [
    process.env.ETH_WETH9,
    process.env.ETH_WBTC,
    process.env.ETH_UNI,
  ];

  let index1Tokens = [
    // process.env.ETH_PEPE,
    // process.env.ETH_FLOKI,
    // process.env.ETH_MOG,
    // process.env.ETH_PAC,
    // process.env.ETH_Neiro,
  ]

  let indexTokens = index1Tokens;

  let usdt_address = process.env.ETH_USDT;

  let swapRouter_address = process.env.ETH_SWAP_ROUTER_V2;
  let dodo_address = process.env.ETH_DODO_MAIN;
  let filter_address = process.env.ETH_FILTER_MAIN;
  let indexHelper_address = process.env.ETH_INDEX_HELPER_MAIN;
  let pathFinder_address = process.env.ETH_PATH_FINDER_MAIN;

  const dodo = await ethers.getContractAt('DODO', dodo_address, deployer);
  const filter = await ethers.getContractAt('Filter', filter_address, deployer);
  const token = await ethers.getContractAt('@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20', usdt_address, deployer);
  const swap = await ethers.getContractAt('ISwapRouter02', swapRouter_address, deployer);
  const pathFinder = await ethers.getContractAt('PathFinder', pathFinder_address, deployer);

  let indexID = 1;
  let index_address = await dodo.indexMap(indexID);
  console.log(index_address);

  const index = await ethers.getContractAt('Index', index_address, deployer);

  /// batch deal positions
  let positionIds = [0];
 

  // let changePositionStatusJson = await index.populateTransaction.changePositionStatus(positionIds[0], 2);

  // console.log(changePositionStatusJson);;
  // let managerIndexTx = await dodo.managerIndex(indexID, changePositionStatusJson.data);
  // await managerIndexTx.wait();
  // console.log(managerIndexTx.hash);

  console.log("status is", await index.positionStatus(positionIds[0]));
  return;

  console.log(await index.positionBalance(positionIds[0], usdt_address));

  let positionId = positionIds[0];

  for(let i = 0; i < indexTokens.length; i ++) {
    console.log("token balance is ", await token.attach(indexTokens[i]).balanceOf(index_address));

    let hash = await index.hashPositionIds(positionIds, indexTokens[i], usdt_address);
    let positionIdsHashData = await index.positionIdsHashList(hash);
    console.log("position data is", positionIdsHashData);

    console.log("set before:", await index.positionBalance(positionId, indexTokens[i]));
    ////set positionBalance

    let params = {
      tokenIn: indexTokens[i],
      tokenOut: usdt_address,
      positionIds: positionIds,
      offset: 0,
      size: positionIds.length
    }
    let setPositionsBalanceTx = await index.setPositionsBalance(params);
    await setPositionsBalanceTx.wait();
    
    console.log("set after:",await index.positionBalance(positionId, indexTokens[i]));
  }

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
