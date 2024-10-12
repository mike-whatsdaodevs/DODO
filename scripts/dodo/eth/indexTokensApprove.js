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

  let indexTokens = [
    process.env.ETH_USDT,
    // process.env.ETH_WETH9,
    // process.env.ETH_WBTC,
    // process.env.ETH_UNI,
  ];

  let usdt_address = process.env.ETH_USDT;

  swapRouter_address = process.env.ETH_SWAP_ROUTER_V2;
  dodo_address = process.env.ETH_DODO_MAIN;
  filter_address = process.env.ETH_FILTER_MAIN;
  indexHelper_address = process.env.ETH_INDEX_HELPER_MAIN;

  const dodo = await ethers.getContractAt('DODO', dodo_address, deployer);
  const filter = await ethers.getContractAt('Filter', filter_address, deployer);
  const token = await ethers.getContractAt('@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20', usdt_address, deployer);

  let index_address = await dodo.indexMap(0);
  console.log(index_address);

  const index = await ethers.getContractAt('Index', index_address, deployer);


  console.log(await index.filter());
  console.log(await index.THIS());
  console.log(await filter.isAllowedToken(process.env.ETH_USDT))
  /// console.log(await filter.indexManagers(await index.THIS(), deployer.address));

  let len = indexTokens.length;
  for(let i=0; i< indexTokens.length; i++) {
      let allowance = await token.attach(indexTokens[i]).allowance(index_address, swapRouter_address);
      if(allowance == 0 || true) {
          tokenApproveTx = await index.safeApprove(indexTokens[i], swapRouter_address);
          await tokenApproveTx.wait();
          console.log("i is ", i, indexTokens[i]);
      }
  }
  return;

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
