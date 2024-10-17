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

  let indexTokens = [
    process.env.ETH_WETH9,
    process.env.ETH_WBTC,
    process.env.ETH_UNI,
  ];

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
  let positionIds = [2];

  console.log(await index.positionStatus(positionIds[0]));

  let positionsBalance0 = await index.positionBalance(positionIds[0], usdt_address);
  console.log(positionsBalance0);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
