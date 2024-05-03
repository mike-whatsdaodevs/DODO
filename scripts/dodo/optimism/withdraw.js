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

  let weth_address;
  let usdt_address;
  let dodo_address;
  if(network == 10) {
    weth_address = process.env.OP_WETH9;
    usdt_address = process.env.OP_USDT;
    dodo_address = process.env.OP_DODO_MAIN;
  } else if(network == 31337) {
    weth_address = process.env.OP_WETH9;
    usdt_address = process.env.OP_USDT;
    dodo_address = process.env.OP_DODO_LOCAL;
  } else {

  }
  let index_address = "0xD707a2c00cbD8F8fE6ed8E5096AF0055cB8473b7";
  const dodo = await ethers.getContractAt('DODO', dodo_address, deployer);
  const index = await ethers.getContractAt('Index', index_address, deployer);

  let index_token_balance = await index.positionBalance(1, usdt_address);
  console.log("position balance 0",index_token_balance);

  let position = await index.getPositionByOrderId(0);
  console.log(position);return;

  let withdrawTx = await dodo.withdrawPosition(0, 1);

  await withdrawTx.wait();

  console.log(withdrawTx.hash);


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
