const { ethers, run } = require('hardhat')
require('dotenv').config({ path: '.env' })

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

  let proxy_address;
  switch (network) {
  case 963:
    proxy_address = process.env.M_PROXYV1;
    break;
  default:
    proxy_address = process.env.LOCAL_PROXYV1;
  }


  const StakingV1 = await hre.ethers.getContractFactory('StakingV1')
  const stakingV1 = await StakingV1.deploy()
  await stakingV1.deployed();

  let implement_address = stakingV1.address;
  const proxy = await ethers.getContractAt('StakingV1', proxy_address, signer)

  console.log("stakingV1 address is", stakingV1.address);
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
