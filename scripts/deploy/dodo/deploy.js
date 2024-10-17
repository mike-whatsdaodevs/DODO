// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat')

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  // We get the contract to deploy

  // 0x4BE6339E1480761e650D2F2Eb27a702dD458654A
  let provider = ethers.provider
  const [deployer] = await ethers.getSigners()
  let my_address = signer.address;
  console.log('my_address is:', my_address)

  const network = (await ethers.provider.getNetwork()).chainId;
  console.log(network);

  let quoterv2_address;
  let ownerAddress;

  if (network == 1) {
    quoterv2_address  = process.env.ETH_QUOTER_V2;
    ownerAddress = deployer.address;
  } else if(network == 10) {
    quoterv2_address  = process.env.OP_QUOTER_V2;
    ownerAddress = deployer.address;
  } else {
    console.log("network error");
    return;
  }

  /// Index 
  const Index = await hre.ethers.getContractFactory('Index')
  const index = await Index.deploy();
  await index.deployed()
  console.log('index deployed to:', index.address)

  /// Path finder
  const PathFinder = await hre.ethers.getContractFactory('PathFinder')
  const pathFinder = await PathFinder.deploy(quoterv2_address, []);
  await pathFinder.deployed()
  console.log('pathFinder deployed to:', pathFinder.address)

  /// Filter
  const Filter = await hre.ethers.getContractFactory('Filter')
  const filter = await Filter.deploy()
  await filter.deployed()
  console.log('filter template deployed to:', filter.address);

  const filter_initialize_data = await filter.populateTransaction.initialize();
  console.log("filter_initialize_data data is",filter_initialize_data)

  const FilterProxy = await hre.ethers.getContractFactory('DODOProxy')
  let filterProxy = await FilterProxy.deploy(filter.address, filter_initialize_data.data);
  await filterProxy.deployed()
  console.log("filterProxy address is", filterProxy.address);

  /// DODO
  const DODO = await hre.ethers.getContractFactory('DODO')
  const dodo = await DODO.deploy()
  await dodo.deployed()
  console.log('dodo template deployed to:', dodo.address);

  const dodo_initialize_data = await dodo.populateTransaction.initialize(
    ownerAddress, 
    index.address, 
    filter.address
  );
  console.log("dodo_initialize_data data is",dodo_initialize_data)

  const DODOProxy = await hre.ethers.getContractFactory('DODOProxy')
  let dodoProxy = await DODOProxy.deploy(dodo.address, dodo_initialize_data.data);
  await dodoProxy.deployed()
  console.log("dodo prixy address is", dodoProxy.address);

  /// index helper
  const IndexHelper = await hre.ethers.getContractFactory('IndexHelper')
  const indexHelper = await IndexHelper.deploy(filter.address);
  await indexHelper.deployed()
  console.log('indexHelper deployed to:', indexHelper.address)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
