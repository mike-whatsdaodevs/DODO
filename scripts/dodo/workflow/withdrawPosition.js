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

  let usdt_address = process.env.ETH_USDT;

  swapRouter_address = process.env.ETH_SWAP_ROUTER_V2;
  dodo_address = process.env.ETH_DODO_MAIN;
  filter_address = process.env.ETH_FILTER_MAIN;
  indexHelper_address = process.env.ETH_INDEX_HELPER_MAIN;

  const dodo = await ethers.getContractAt('DODO', dodo_address, deployer);

  let indexID = 1;
  let positionId = 1;
  let index_address = await dodo.indexMap(indexID);
  console.log(index_address);
  const usdtToken = await ethers.getContractAt('@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20', usdt_address, deployer);
  const index = await ethers.getContractAt('Index', index_address, deployer);

  let gasUsed = await index.gasUsed();
  console.log(gasUsed);
  let lastGasUsed = await index.lastGasUsed();
  console.log(lastGasUsed);
  ///  

  let positionsGasUsedAverage = await index.positionsGasUsedAverage(positionId);
  console.log(positionsGasUsedAverage);

  let withdrawPositionTx = await dodo.withdrawPosition(indexID, positionId);
  await withdrawPositionTx.wait();
  // function withdrawPosition(uint256 indexId, uint256 positionId) external {
  console.log(withdrawPositionTx.hash);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
