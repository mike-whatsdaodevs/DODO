const { ethers, run } = require('hardhat')
require('dotenv').config({ path: '.env' })

async function main() {
  await run('compile')

  let provider = ethers.provider

  console.log('NetWorks ID is ', (await ethers.provider.getNetwork()).chainId)
  console.log('NetWorks Name is ', (await ethers.provider.getNetwork()).name)

  const [deployer] = await ethers.getSigners()

  console.log('deployer:' + deployer.address)

  const network = (await ethers.provider.getNetwork()).chainId;
  console.log(network);

  let proxy_address = process.env.M_NODE;

  const NodeStakingRewardsFactory = await hre.ethers.getContractFactory('NodeStakingRewards')
  const NodeStakingRewards = await NodeStakingRewardsFactory.deploy()
  await NodeStakingRewards.deployed();
  console.log('NodeStakingRewards deployed to:', NodeStakingRewards.address)
  
  let implement_address = NodeStakingRewards.address;
  const proxy = await ethers.getContractAt('NodeStakingRewards', proxy_address, deployer)

  console.log("implement_address is:", implement_address);
  console.log("proxy address is:", proxy_address);

  let upgradeToTx = await proxy.upgradeTo(implement_address);
  await upgradeToTx.wait();

  console.log(upgradeToTx.hash);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
