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
  const indexHelper = await ethers.getContractAt('IndexHelper', indexHelper_address, deployer);

  let indexID = process.env.INDEXID;

  let index_address = await dodo.indexMap(indexID);
  console.log("index address:", index_address);
  console.log("dodo address:", dodo.address);

  const index = await ethers.getContractAt('Index', index_address, deployer);

  /// batch deal positions
  let positionIds = [0];

  console.log(await index.positionStatus(positionIds[0]));

  let isDynamic = await index.isDynamic();
  console.log("isDynamic: ", isDynamic);

  let gasUsed;
  if(isDynamic) {
      let gasObj = await index.positionsGasUsedAverage(positionIds[0]);
      gasUsed = gasObj.closed - gasObj.created;
  } else {
      gasUsed = await index.staticGasUsed();
  }
  
  console.log(gasUsed);

  let basefee = await indexHelper.getBasefee(index_address);
  console.log("basefee: ", basefee);


  let getGasUsedWithBaseFee = await indexHelper.getGasUsedWithBaseFee(index_address, gasUsed);
  console.log(getGasUsedWithBaseFee);


  let usetValue = await index.gasExchageUnderlying(gasUsed * basefee);
  console.log("usetValue: ", usetValue);


  // let gasUsedWithBaseFee = await indexHelper.getGasUsedWithBaseFee(gasUsed);
  // console.log("gasUsedWithBaseFee: ", gasUsedWithBaseFee);

  let gasUsedAndValue = await indexHelper.getPositionGasUsedValue(index_address, positionIds[0]);
  console.log("gasUsedAndValue: ", gasUsedAndValue);

  let positionsBalance0 = await index.positionBalance(positionIds[0], usdt_address);
  console.log(positionsBalance0);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
