const { ethers, run } = require('hardhat')
require('dotenv').config({ path: '.env' })

async function main() {
  await run('compile')

  let provider = ethers.provider

  console.log('NetWorks ID is ', (await ethers.provider.getNetwork()).chainId)
  console.log('NetWorks Name is ', (await ethers.provider.getNetwork()).name)

  const [deployer] = await ethers.getSigners()

  console.log('deployer:' + deployer.address)

  let weth9_address = process.env.WETH9;
  let usdc_address = process.env.USDC;
  let dodo_address = "0x0F1D1d61f0d8b3731bca2238B765F461144103A6";//process.env.DODO;

  const dodo = await ethers.getContractAt('DODO', dodo_address, deployer);

  let createIndexTx = await dodo.createIndex("usdc_eth", [weth9_address, usdc_address]);

  await createIndexTx.wait();

  console.log(createIndexTx.hash);


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
