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

  let weth_address;
  let usdt_address;
  let pathFinder_address;
  let swapRouter_address;
  let dodo_address;
  let indexTokens = [
    process.env.OP_USDC,
    process.env.OP_WETH9,
    process.env.OP_WBTC,
    process.env.OP_LINK,
    process.env.OP_OP,
    process.env.OP_WLD,
    // process.env.OP_LDO,
    // process.env.OP_W,
    // process.env.OP_PYTH,
    process.env.OP_SNX
  ];
  if(network == 10) {
    weth_address = process.env.OP_WETH9;
    usdt_address = process.env.OP_USDT;
    pathFinder_address =  process.env.OP_PATH_FINDER_MAIN;
    swapRouter_address = process.env.OP_SWAP_ROUTER_V2;
    dodo_address = process.env.OP_DODO_MAIN;
  } else if(network == 31337) {
    weth_address = process.env.OP_WETH9;
    usdt_address = process.env.OP_USDT;
    pathFinder_address =  process.env.OP_PATH_FINDER_MAIN;
    swapRouter_address = process.env.OP_SWAP_ROUTER_V2;
    dodo_address = process.env.OP_DODO_LOCAL;
  } else {

  }

  const dodo = await ethers.getContractAt('DODO', dodo_address, signer);


  let index_address = await dodo.indexMap(0);
  console.log("index_address is:", index_address);


  const index = await ethers.getContractAt('Index', index_address, signer);
  const token = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", usdt_address, signer);
  const weth = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", weth_address, signer);
  const swap = await ethers.getContractAt('ISwapRouter02', swapRouter_address, signer);
  const pathFinder = await ethers.getContractAt('PathFinder', pathFinder_address, signer);

  /// batch deal positions
  let positionIds = [2,3];

 
  console.log("status is", await index.positionStatus(positionIds[0]));
  console.log("status is", await index.positionStatus(positionIds[1]));

  let hash = await index.hashPositionIds(positionIds, usdt_address, indexTokens[1]);
  let positionIdsHashData = await index.positionIdsHashList(hash);
  console.log("position data is", positionIdsHashData);

  let positionsBalance = await index.getPositionsBalance(usdt_address, positionIds);
  console.log("positionsBalance is:", positionsBalance);
  return;


  let positionId = positionIds[0];//await index.positionId();

  // let hash = await index.hashPositionIds(positionIds, usdt_address, indexTokens[1]);
  // let positionIdsHashData = await index.positionIdsHashList(hash);
  // console.log("position data is", positionIdsHashData);

  // let positionsBalance = await index.getPositionsBalance(usdt_address, positionIds);
  // console.log("positionsBalance is:", positionsBalance);

  // let params = {
  //     tokenIn: usdt_address,
  //     tokenOut: indexTokens[1],
  //     positionIds: positionIds,
  //     offset: 0,
  //     size: positionIds.length
  // }
  // console.log(params);
  // let setPositionsBalanceTx = await index.setPositionsBalance(params);
  // await setPositionsBalanceTx.wait();
  // return;


  for(let i = 0; i < indexTokens.length; i ++) {
    const obj = token.attach(indexTokens[i]);
    console.log("token balance is ", await obj.balanceOf(index_address));

    let hash = await index.hashPositionIds(positionIds, usdt_address, indexTokens[i]);
    let positionIdsHashData = await index.positionIdsHashList(hash);
    console.log("position data is", positionIdsHashData);

    console.log("set before:", await index.positionBalance(positionId, indexTokens[i]));

    ////set positionBalance

    let params = {
      tokenIn: usdt_address,
      tokenOut: indexTokens[i],
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
