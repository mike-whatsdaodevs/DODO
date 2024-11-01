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

  let indexTokens;
  let filter_address;
  let dodo_address;
  let indexHelper_address;
  let pathFinder_address;
  let usdt_address;
  let swapRouter_address;

  if (network == 1) {
    filter_address = process.env.ETH_FILTER_MAIN;
    dodo_address = process.env.ETH_DODO_MAIN;
    indexHelper_address = process.env.ETH_INDEX_HELPER_MAIN;
    pathFinder_address = process.env.ETH_PATH_FINDER_MAIN;
    usdt_address = process.env.ETH_USDT;
    swapRouter_address = process.env.ETH_SWAP_ROUTER_V2;
  } else if(network == 10) {
    filter_address = process.env.OP_FILTER_MAIN;
    dodo_address = process.env.OP_DODO_MAIN;
    indexHelper_address = process.env.OP_INDEX_HELPER_MAIN;
    pathFinder_address = process.env.OP_PATH_FINDER_MAIN;
    usdt_address = process.env.OP_USDT;
    swapRouter_address = process.env.OP_SWAP_ROUTER_V2;
  } else {
    console.log("network error");
    return;
  }

  const dodo = await ethers.getContractAt('DODO', dodo_address, deployer);
  const filter = await ethers.getContractAt('Filter', filter_address, deployer);
  const token = await ethers.getContractAt('@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20', usdt_address, deployer);
  const swap = await ethers.getContractAt('ISwapRouter02', swapRouter_address, deployer);
  const pathFinder = await ethers.getContractAt('PathFinder', pathFinder_address, deployer);

  let indexID = process.env.INDEXID;

  let index_address = await dodo.indexMap(indexID);
  console.log(index_address);

  const index = await ethers.getContractAt('Index', index_address, deployer);

  indexTokens = await filter.getIndexTokens(index_address);
  console.log(indexTokens);

  /// batch deal positions
  let positionIds = [1];

  let positionsGasUsedAverage = await index.positionsGasUsedAverage(positionIds[0]);
  console.log("positionsGasUsedAverage:", positionsGasUsedAverage);

  console.log(await index.positionStatus(positionIds[0]));

  for(let i = 0; i < indexTokens.length; i ++) {
    let positionsBalance0 = await index.positionBalance(positionIds[0], indexTokens[i]);
    console.log(positionsBalance0);
  }
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
