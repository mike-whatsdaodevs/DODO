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
  
  let index0Tokens = [
    process.env.ETH_WETH9,
    process.env.ETH_WBTC,
    process.env.ETH_UNI,
  ];

  let index1Tokens = [
    process.env.ETH_PEPE,
    process.env.ETH_FLOKI,
    process.env.ETH_MOG,
    process.env.ETH_Neiro,
    process.env.ETH_USDT
  ]

  let usdt_address = process.env.ETH_USDT;

  swapRouter_address = process.env.ETH_SWAP_ROUTER_V2;
  dodo_address = process.env.ETH_DODO_MAIN;
  filter_address = process.env.ETH_FILTER_MAIN;
  indexHelper_address = process.env.ETH_INDEX_HELPER_MAIN;

  const dodo = await ethers.getContractAt('DODO', dodo_address, deployer);
  const filter = await ethers.getContractAt('Filter', filter_address, deployer);
  const token = await ethers.getContractAt('@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20', usdt_address, deployer);

  let indexID = 1;
  let index_address = await dodo.indexMap(indexID);
  console.log(index_address);

  const index = await ethers.getContractAt('Index', index_address, deployer);

  let target = indexHelper_address;//process.env.JAY;

  let isManager = await filter.indexManagers(index_address, target);
  console.log(isManager);
  return;

  let manageIndexManagerTx = await filter.manageIndexManager(index_address, target, true);
  await manageIndexManagerTx.wait();
  console.log(manageIndexManagerTx.hash);
  return;

  let addIndexTokensTx = await filter.addIndexTokens(index_address, index1Tokens);
  await addIndexTokensTx.wait();
  console.log(addIndexTokensTx.hash);
  return;


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
