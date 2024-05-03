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
    dodo_address = "0x40bde52e6B80Ae11F34C58c14E1E7fE1f9c834C4";// process.env.OP_DODO_LOCAL;
  } else {

  }


  const dodo = await ethers.getContractAt('DODO', dodo_address, deployer);

  let index_address = await dodo.indexMap(0);
  console.log(index_address);
  const index = await ethers.getContractAt('Index', index_address, deployer);

  let positionAddTx =  await index.positionAdd();
  await positionAddTx.wait();

  // let position = await index.positionGet(1);
  // console.log(position);

  let position1 = await index.getPositionById(1);
  console.log(position1);

  let position2 = await index.getPositionByOrderId(1);
  console.log(position2);
  return;

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
