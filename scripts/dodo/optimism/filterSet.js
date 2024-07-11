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
  let indexHelper_address;
  let DAI_ADDRESS = "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1";
  let indexTokens = [
    process.env.OP_USDC,
    process.env.OP_WETH9,
    process.env.OP_WBTC,
    // process.env.OP_LINK,
    // process.env.OP_OP,
    // process.env.OP_WLD,
    // // process.env.OP_LDO,
    // // process.env.OP_W,
    // // process.env.OP_PYTH,
    // process.env.OP_SNX,
    // DAI_ADDRESS
  ];

  let allowedTokens = [
    process.env.OP_USDT,
    process.env.OP_USDC,
    process.env.OP_WETH9,
    process.env.OP_WBTC,
    process.env.OP_LINK,
    process.env.OP_OP,
    process.env.OP_WLD,
    process.env.OP_SNX,
    DAI_ADDRESS
  ];
  if(network == 10) {
    weth_address = process.env.OP_WETH9;
    usdt_address = process.env.OP_USDT;
    pathFinder_address =  process.env.OP_PATH_FINDER_MAIN;
    swapRouter_address = process.env.OP_SWAP_ROUTER_V2;
    dodo_address = process.env.OP_DODO_MAIN;
    filter_address = process.env.OP_FILTER;
    indexHelper_address = process.env.OP_INDEX_HELPER;
  } else if(network == 31337) {
    weth_address = process.env.OP_WETH9;
    usdt_address = process.env.OP_USDT;
    pathFinder_address =  process.env.OP_PATH_FINDER_MAIN;
    swapRouter_address = process.env.OP_SWAP_ROUTER_V2;
    dodo_address = process.env.OP_DODO_LOCAL;
  } else {

  }

  const dodo = await ethers.getContractAt('DODO', dodo_address, deployer);
  const filter = await ethers.getContractAt('Filter', filter_address, deployer);
  const token = await ethers.getContractAt('@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20', usdt_address, deployer);
 
  let index_address = await dodo.indexMap(4);
  console.log(index_address);

  console.log("getIndexTokens is :", await filter.getIndexTokens(index_address));

  let manageIndexManagerTx0 = await filter.manageIndexManager(index_address, indexHelper_address, true);
  await manageIndexManagerTx0.wait();
  console.log(manageIndexManagerTx0.hash);

  let manageIndexManagerTx1 = await filter.manageIndexManager(index_address, "0x674323Fcb56106Ed1AB89B7d861dd23e438b81A6", true);
  await manageIndexManagerTx1.wait();
  console.log(manageIndexManagerTx1.hash);
  return;

  // let manageIndexManagerTx2 = await filter.manageIndexManager(index_address, deployer.address, true);
  // await manageIndexManagerTx2.wait();
  // console.log(manageIndexManagerTx2.hash);

  let manageIndexManagerDODOTx = await filter.manageIndexManager(index_address, dodo_address, true);
  await manageIndexManagerDODOTx.wait();
  console.log(manageIndexManagerDODOTx.hash);
  return;
  
  // let addIndexTokensTx = await filter.addIndexTokens(index_address, indexTokens);
  // await addIndexTokensTx.wait();
  // console.log(addIndexTokensTx.hash);


 for(let i=0; i< allowedTokens.length; i++) {
 
      let allowance = await token.attach(allowedTokens[i]).allowance(index_address, swapRouter_address);
      if(allowance == 0) {
          tokenApproveTx = await index.safeApprove(allowedTokens[i], swapRouter_address);
          await tokenApproveTx.wait();
          console.log("i is ", i, allowedTokens[i]);
      }
  }
  return;

  // let len = allowedTokens.length;
  // for(let i = 0; i < len; i ++) {
  //    let manageAllowedTokenTx = await filter.manageAllowedToken(allowedTokens[i], true);
  //    await manageAllowedTokenTx.wait();
  //    console.log(manageAllowedTokenTx.hash);
  // }

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
