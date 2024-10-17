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

  let allowedTokens;
  let filter_address;

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
  } else if(network == 10) {
    allowedTokens = [
      process.env.OP_USDT,
      process.env.OP_WETH9,
      process.env.OP_WBTC,
      process.env.OP_LINK,
      process.env.OP_OP,
      process.env.OP_WLD,
      process.env.OP_SNX,
    ];
    filter_address = process.env.OP_FILTER_MAIN;
  } else {
    console.log("network error");
    return;
  }

  console.log(allowedTokens);

  const filter = await ethers.getContractAt('Filter', filter_address, deployer);
 
  // let addIndexTokensTx = await filter.addIndexTokens(index_address, indexTokens);
  // await addIndexTokensTx.wait();
  // console.log(addIndexTokensTx.hash);

  let len = allowedTokens.length;
  for(let i = 0; i < len; i ++) {
     let manageAllowedTokenTx = await filter.manageAllowedToken(allowedTokens[i], true);
     await manageAllowedTokenTx.wait();
     console.log(manageAllowedTokenTx.hash);
  }

  // for(let i=0; i< allowedTokens.length; i++) {
  //     let allowance = await token.attach(allowedTokens[i]).allowance(index_address, swapRouter_address);
  //     if(allowance == 0) {
  //         tokenApproveTx = await index.safeApprove(allowedTokens[i], swapRouter_address);
  //         await tokenApproveTx.wait();
  //         console.log("i is ", i, allowedTokens[i]);
  //     }
  // }
  return;

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
