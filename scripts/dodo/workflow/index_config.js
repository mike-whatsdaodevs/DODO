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

  let indexTokens;
  let filter_address;
  let dodo_address;
  let indexHelper_address;
  let usdt_address;
  let swapRouter_address;

  if (network == 1) {
    allowedTokens = [
      // process.env.ETH_WETH9
      // process.env.ETH_WBTC,
      // process.env.ETH_UNI,
      // process.env.ETH_MKR,
      // process.env.ETH_LINK,
      // process.env.ETH_PEPE,
      // process.env.ETH_FLOKI,
      // process.env.ETH_MNT,
      // process.env.ETH_MOG,
      // process.env.ETH_AAVE,
      // process.env.ETH_FRAX,
      // process.env.ETH_Neiro,
      // process.env.ETH_EIGEN,
      // process.env.ETH_MEGA,
      // process.env.ETH_wTAO,
      // process.env.ETH_PAC,
      // process.env.ETH_LDO,
      // process.env.ETH_WLD,
      // process.env.ETH_ENA,
      // process.env.ETH_ENS,
      // process.env.ETH_APE,
    ];
    filter_address = process.env.ETH_FILTER_MAIN;
    dodo_address = process.env.ETH_DODO_MAIN;
    indexHelper_address = process.env.ETH_INDEX_HELPER_MAIN;
    usdt_address = process.env.ETH_USDT;
    swapRouter_address = process.env.ETH_SWAP_ROUTER_V2;
  } else if(network == 10) {
    // indexTokens = [
    //   process.env.OP_WETH9,
    //   process.env.OP_WBTC,
    //   process.env.OP_OP,
    // ];
// process.env.OP_PIKA,
    indexTokens = [
      process.env.OP_WETH9,
      process.env.OP_WBTC,
      process.env.OP_LINK,
      process.env.OP_OP,
      // process.env.OP_WLD,
      // process.env.OP_SNX,
      // process.env.OP_PERP,
      // process.env.OP_THALES,
      // process.env.OP_wstETH,
      process.env.OP_USDC,
      process.env.OP_DAI,
    ];
    filter_address = process.env.OP_FILTER_MAIN;
    dodo_address = process.env.OP_DODO_MAIN;
    indexHelper_address = process.env.OP_INDEX_HELPER_MAIN;
    usdt_address = process.env.OP_USDT;
    swapRouter_address = process.env.OP_SWAP_ROUTER_V2;
  } else {
    console.log("network error");
    return;
  }

  const dodo = await ethers.getContractAt('DODO', dodo_address, deployer);
  const filter = await ethers.getContractAt('Filter', filter_address, deployer);

  let indexID = process.env.INDEXID;

  let index_address = await dodo.indexMap(indexID);
  console.log(index_address);

  const index = await ethers.getContractAt('Index', index_address, deployer);
  const token = await ethers.getContractAt('@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20', usdt_address, deployer);


  

  let target = indexHelper_address;//process.env.JAY;
  let managers = [
    indexHelper_address,
    process.env.JAY,
    deployer.address,
    dodo_address
  ]

  // let removeIndexTokensTx = await filter.removeIndexTokens(index_address, [process.env.OP_NBL]);
  // await removeIndexTokensTx.wait();
  // console.log(removeIndexTokensTx.hash);return;
  // console.log(await index.filter());
  // console.log(await filter.indexManagers(index_address, dodo_address));return;

  for(let i = 0; i < managers.length; i ++) {
      let isManager = await filter.indexManagers(index_address, managers[i]);
      console.log(isManager);
      if(! isManager) {
          let manageIndexManagerTx = await filter.manageIndexManager(index_address, managers[i], true);
          await manageIndexManagerTx.wait();
          console.log(manageIndexManagerTx.hash);
      }
  }

  let insertedIndexTokens = await filter.getIndexTokens(index_address);
  console.log(insertedIndexTokens);
  console.log(indexTokens);
  if(insertedIndexTokens.length == 0) {
    let addIndexTokensTx = await filter.addIndexTokens(index_address, indexTokens);
    await addIndexTokensTx.wait();
    console.log(addIndexTokensTx.hash);
  }

  let allowance = await token.allowance(index_address, swapRouter_address);
  console.log(usdt_address, "  ", allowance);
  if (allowance == 0) {
    let tokenApproveTx = await index.safeApprove(usdt_address, swapRouter_address);
    await tokenApproveTx.wait();
  }

  for(let i = 0; i < indexTokens.length; i ++) {
    let allowance = await token.attach(indexTokens[i]).allowance(index_address, swapRouter_address);
    console.log(indexTokens[i], "  ", allowance);
    if (allowance == 0) {
      let tokenApproveTx = await index.safeApprove(indexTokens[i], swapRouter_address);
      await tokenApproveTx.wait();
    }
  }



}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
