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

  let usdt_address = process.env.ETH_USDT;

  swapRouter_address = process.env.ETH_SWAP_ROUTER_V2;
  dodo_address = process.env.ETH_DODO_MAIN;
  filter_address = process.env.ETH_FILTER_MAIN;
  indexHelper_address = process.env.ETH_INDEX_HELPER_MAIN;

  const dodo = await ethers.getContractAt('DODO', dodo_address, deployer);

  let removed_tokens = [process.env.ETH_MOG];
  let add_tokens = [process.env.ETH_APE];

  let indexID = 1;
  let index_address = await dodo.indexMap(indexID);
  console.log(index_address);
  const token = await ethers.getContractAt('@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20', usdt_address, deployer);
  const index = await ethers.getContractAt('Index', index_address, deployer);
  const filter = await ethers.getContractAt('Filter', filter_address, deployer);
  const indexhelper = await ethers.getContractAt('IndexHelper', indexHelper_address, deployer);
 

  let transferOwnershipTx = await indexhelper.transferOwnership(process.env.JAY);
  await transferOwnershipTx.wait();
  console.log(transferOwnershipTx.hash);
  return;

  console.log(await filter.getIndexTokens(index_address));

  let allowance = await token.attach(add_tokens[0]).allowance(index_address, swapRouter_address);
  if(allowance == 0) {
      tokenApproveTx = await index.safeApprove(add_tokens[0], swapRouter_address);
      await tokenApproveTx.wait();
      console.log("tokenApproveTx ", tokenApproveTx.hash);
  }

  let changeIndexTokenTx = await indexhelper.changeIndexTokens(
    index_address, 
    add_tokens, 
    removed_tokens
  );

  console.log(await filter.getIndexTokens(index_address));
  return;

  // let removeIndexTokensTx = await filter.removeIndexTokens(index_address, removed_tokens);
  // await removeIndexTokensTx.wait();
  // console.log(removeIndexTokensTx.hash);
  // return;
  
  // let addIndexTokensTx = await filter.addIndexTokens(index_address, add_tokens);
  // await addIndexTokensTx.wait();

  // console.log(await filter.getIndexTokens(index_address));
  // return;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
