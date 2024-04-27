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
  await hre.run('compile');

  let provider = ethers.provider;
  let signer = provider.getSigner();

  let my_address = await signer.getAddress();
  console.log(my_address);
 
  const NodeStakingRewardsFactory = await hre.ethers.getContractFactory('NodeStakingRewards')
  const NodeStakingRewards = await NodeStakingRewardsFactory.deploy()
  await NodeStakingRewards.deployed();
  console.log('NodeStakingRewards deployed to:', NodeStakingRewards.address)

  // const stakingObj = await hre.ethers.getContractAt('Staking', staking, signer)
  const initialize_data = await NodeStakingRewards.populateTransaction.initialize();
  console.log("initialize_data data is",initialize_data)

  const COD20ProxyV1 = await hre.ethers.getContractFactory('COD20Proxy')
  let proxyV1 = await COD20ProxyV1.deploy(NodeStakingRewards.address, initialize_data.data);
  await proxyV1.deployed()
  console.log("proxyV1 address is", proxyV1.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
