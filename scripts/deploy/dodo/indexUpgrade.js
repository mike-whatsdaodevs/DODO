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

  let dodo_address = process.env.ETH_DODO_MAIN;
  let index_imp = process.env.ETH_INDEX_MAIN1;

  const dodo = await ethers.getContractAt('DODO', dodo_address, deployer);

  let changeSingletonTx = await dodo.changeSingleton(index_imp);
  await changeSingletonTx.wait();
  console.log(changeSingletonTx.hash);
  return;

  let indexID = 1;
  let index_address = await dodo.indexMap(indexID);
  console.log(index_address);

  let upgradeIndexTx = await dodo.upgradeIndexImplement(index_address, index_imp, "0x");
  await upgradeIndexTx.wait();
  console.log(upgradeIndexTx.hash);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
