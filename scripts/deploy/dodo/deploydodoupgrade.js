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

  const [deployer] = await ethers.getSigners()
  console.log('deployer:' + deployer.address)

  const network = (await ethers.provider.getNetwork()).chainId;
  console.log(network);

  let indexSingleton_address;
  let filter_address;

  if (network == 1) {
    indexSingleton_address = process.env.ETH_INDEX_MAIN;
    filter_address = process.env.ETH_FILTER_MAIN;
  } else if(network == 10) {
    indexSingleton_address = process.env.OP_INDEX_MAIN;
    filter_address = process.env.OP_FILTER_MAIN;
  } else {
    console.log("network error");
    return;
  }

  console.log(indexSingleton_address);
  console.log(filter_address);

  const DODO = await hre.ethers.getContractFactory('DODO')
  const dodo = await DODO.deploy()
  await dodo.deployed()
  console.log('dodo deployed to:', dodo.address);

  const initialize_data = await dodo.populateTransaction.initialize(
    deployer.address, 
    indexSingleton_address, 
    filter_address
  );
  console.log("initialize_data data is",initialize_data)

  const DODOProxy = await hre.ethers.getContractFactory('DODOProxy')
  let proxy = await DODOProxy.deploy(dodo.address, initialize_data.data);
  await proxy.deployed()
  console.log("proxy address is", proxy.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
