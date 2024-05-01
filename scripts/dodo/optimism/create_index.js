const { ethers, run } = require('hardhat')
require('dotenv').config({ path: '.env' })

async function main() {
  await run('compile')

  let provider = ethers.provider

  console.log('NetWorks ID is ', (await ethers.provider.getNetwork()).chainId)
  console.log('NetWorks Name is ', (await ethers.provider.getNetwork()).name)

  const [deployer] = await ethers.getSigners()

  console.log('deployer:' + deployer.address)

  let weth9_address = process.env.OP_WETH9;
  let usdt_address = process.env.OP_USDT;
  
  let dodo_address = "0xAbB12158488d9C9Bd52C14B9AE4C835eCE4A6e13";//process.env.DODO;

  const dodo = await ethers.getContractAt('DODO', dodo_address, deployer);

  let createIndexTx = await dodo.createIndex("usdc_eth", [weth9_address, usdt_address]);

  await createIndexTx.wait();

  console.log(createIndexTx.hash);


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
