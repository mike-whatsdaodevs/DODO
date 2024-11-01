const { ethers, run } = require('hardhat')

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

  let dodo_address;
  let index_template_address;

  if (network == 1) {
    dodo_address = process.env.ETH_DODO_MAIN;
    index_template_address = process.env.ETH_INDEX_MAIN;
  } else if(network == 10) {
    dodo_address = process.env.OP_DODO_MAIN;
    index_template_address = process.env.OP_INDEX_MAIN;
  } else {
    console.log("network error");
    return;
  }

  const dodo = await ethers.getContractAt('DODO', dodo_address, signer);

  let changeSingletonTx = await dodo.changeSingleton(index_template_address);
  await changeSingletonTx.wait();
  console.log(changeSingletonTx.hash);return;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
