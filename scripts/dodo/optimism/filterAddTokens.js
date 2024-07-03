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
  let pathFinder_address;
  let swapRouter_address;
  let dodo_address;
  let filter_address;
  let indexTokens = [
    process.env.OP_USDC,
    process.env.OP_WETH9,
    process.env.OP_WBTC,
    process.env.OP_LINK,
    process.env.OP_OP,
    process.env.OP_WLD,
    // process.env.OP_LDO,
    // process.env.OP_W,
    // process.env.OP_PYTH,
    process.env.OP_SNX
  ];
  if(network == 10) {
    weth_address = process.env.OP_WETH9;
    usdt_address = process.env.OP_USDT;
    pathFinder_address =  process.env.OP_PATH_FINDER_MAIN;
    swapRouter_address = process.env.OP_SWAP_ROUTER_V2;
    dodo_address = process.env.OP_DODO_MAIN;
    filter_address = process.env.OP_FILTER;
  } else if(network == 31337) {
    weth_address = process.env.OP_WETH9;
    usdt_address = process.env.OP_USDT;
    pathFinder_address =  process.env.OP_PATH_FINDER_MAIN;
    swapRouter_address = process.env.OP_SWAP_ROUTER_V2;
    dodo_address = process.env.OP_DODO_LOCAL;
  } else {

  }

  let DAI_ADDRESS = "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1";

  const dodo = await ethers.getContractAt('DODO', dodo_address, deployer);
  const filter = await ethers.getContractAt('Filter', filter_address, deployer);
  const usdtToken = await ethers.getContractAt('@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20', usdt_address, deployer);
 
  let index_address = await dodo.indexMap(0);
  console.log(index_address);

  let indexLength = await filter.indexTokensLenth(index_address);
  console.log(indexLength);return;

  let newTokens = [
      DAI_ADDRESS
  ];

  // let len = newTokens.length;
  // for(let i = 0; i < len; i ++) {
  //    let manageAllowedTokenTx = await filter.manageAllowedToken(newTokens[i], true);
  //    await manageAllowedTokenTx.wait();
  //    console.log(manageAllowedTokenTx.hash);
  // }
  // return;

  let addIndexTokensTx = await filter.addIndexTokens(index_address, newTokens);
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
