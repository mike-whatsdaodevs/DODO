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

  let proxy_address = process.env.ETH_DODO_MAIN;

  const DODO = await hre.ethers.getContractFactory('DODO')
  const dodo = await DODO.deploy()
  await dodo.deployed()
  console.log('dodo deployed to:', dodo.address);

  let implement_address = dodo.address;
  const proxy = await ethers.getContractAt('DODO', proxy_address, deployer);
  let upgradeToTx = await proxy.upgradeTo(implement_address);
  await upgradeToTx.wait();

  console.log(upgradeToTx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
