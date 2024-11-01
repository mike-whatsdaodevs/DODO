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

  let index_address;
  let dodo_address;
  if (network == 1) {
    index_address = process.env.ETH_INDEX_MAIN;
    dodo_address = process.env.ETH_DODO_MAIN;
  } else if(network == 10) {
    dodo_address = process.env.OP_DODO_MAIN;
    index_address = process.env.OP_INDEX_MAIN;
  } else {
    console.log("network error");
    return;
  }

  const dodo = await ethers.getContractAt('DODO', dodo_address, deployer);

  let changeSingletonTx = await dodo.changeSingleton(index_address);
  await changeSingletonTx.wait();
  console.log(changeSingletonTx.hash);

  let indexID = process.env.INDEXID;
  
  let index0_address = await dodo.indexMap(indexID);
  console.log(index0_address);

  let upgradeIndexTx = await dodo.upgradeIndexImplement(index0_address, index_address, "0x");
  await upgradeIndexTx.wait();
  console.log(upgradeIndexTx.hash);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
