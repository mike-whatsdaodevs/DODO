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

  let indexHelper_address;

  if (network == 1) {
    indexHelper_address = process.env.ETH_INDEX_HELPER_MAIN;
  } else if(network == 10) {
    indexHelper_address = process.env.OP_INDEX_HELPER_MAIN;
  } else {
    console.log("network error");
    return;
  }

  const indexHelper = await ethers.getContractAt('IndexHelper', indexHelper_address, deployer);

  let tx = await indexHelper.transferOwnership(process.env.JAY);
  await tx.wait();
  console.log(tx.hash);



}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
