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
    process.env.ETH_PEPE,
    process.env.ETH_FLOKI,
    process.env.ETH_MOG,
    process.env.ETH_Neiro,
    // process.env.ETH_PAC
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
  let positionIds = [11];

  console.log("status is", await index.positionStatus(positionIds[0]));
  return;

  let hash = await index.hashPositionIds(positionIds, indexTokens[1], usdt_address);
  let positionIdsHashData = await index.positionIdsHashList(hash);
  console.log("position data is", positionIdsHashData);

  let positionsBalance = await index.getPositionsBalance(indexTokens[0], positionIds);
  console.log("positionsBalance is:", positionsBalance);

  let positionId = positionIds[0];//await index.positionId();

  for(let i = 0; i < indexTokens.length; i ++) {
    const obj = token.attach(indexTokens[i]);
    console.log("token balance is ", await obj.balanceOf(index_address));

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
 
  // ////set positionBalance
  // let hash = await index.hashPositionIds(positionIds, usdt_address, weth_address);
  // console.log(hash);
  // let positionIdsHashData = await index.positionIdsHashList(hash);
  // console.log(positionIdsHashData);
  // let setPositionsBalanceTx = await index.setPositionsBalance(usdt_address, weth_address,positionIds, 0, positionIds.length);
  // await setPositionsBalanceTx.wait();
  // return;


  // let amountOut = ethers.utils.parseEther("0.68");
  // let avg = amountOut.div(2);
  // let positionIdsLength = positionIds.length;

  // let values = new Array(positionIdsLength);
  // for(let i = 0; i < positionIdsLength; ++i ) {
  //     if(i < positionIdsLength - 1) {
  //       values[i] = avg;
  //     } else {
  //       values[i] = amountOut.sub(avg.mul(positionIdsLength - 1));
  //     }
  // }

  // let setBalanceTx = await index.setPositionsBalance(
  //   usdt_address, 
  //   positionIds, 
  //   values
  // );
  // await setBalanceTx.wait();
  // console.log("set balance end,", setBalanceTx.hash);

  // let weth_balance2 = await weth.balanceOf(index_address);
  // console.log(ethers.utils.formatEther(weth_balance2));

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
