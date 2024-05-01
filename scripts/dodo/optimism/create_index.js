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
  
  let dodo_address = "0x40bde52e6B80Ae11F34C58c14E1E7fE1f9c834C4";//process.env.DODO;

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
