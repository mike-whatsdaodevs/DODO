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

  let dodo_address;

  if (network == 1) {
    dodo_address = process.env.ETH_DODO_MAIN;
  } else if(network == 10) {
    dodo_address = process.env.OP_DODO_MAIN;
  } else {
    console.log("network error");
    return;
  }

  const dodo = await ethers.getContractAt('DODO', dodo_address, deployer);

  /// true 为动态index
  /// false为静态index
  let isDynamicIndex = false;
  let createIndexTx = await dodo.createIndex("ETH_BTC_OP", isDynamicIndex);

  await createIndexTx.wait();

  console.log(createIndexTx.hash);

  console.log(await dodo.id());

  let index_address = await dodo.indexMap(0);
  console.log(index_address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
