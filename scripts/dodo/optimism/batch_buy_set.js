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

  let weth_address;
  let usdt_address;
  let pathFinder_address;
  let swapRouter_address;
  let dodo_address;
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
  } else if(network == 31337) {
    weth_address = process.env.OP_WETH9;
    usdt_address = process.env.OP_USDT;
    pathFinder_address =  process.env.OP_PATH_FINDER_MAIN;
    swapRouter_address = process.env.OP_SWAP_ROUTER_V2;
    dodo_address = process.env.OP_DODO_LOCAL;
  } else {

  }

  const dodo = await ethers.getContractAt('DODO', dodo_address, signer);

  let dodoId = await dodo.id();
  console.log(dodoId);
  let index_address = await dodo.indexMap(0);
  console.log(index_address);

  const index = await ethers.getContractAt('Index', index_address, signer);
  const usdt = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", usdt_address, signer);
  const weth = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", weth_address, signer);
  const swap = await ethers.getContractAt('ISwapRouter02', swapRouter_address, signer);
  const pathFinder = await ethers.getContractAt('PathFinder', pathFinder_address, signer);



  let allowance = await usdt.allowance(index_address, swapRouter_address);
  if (allowance == 0) {
    let tokenApproveTx = await index.safeApprove(usdt_address, swapRouter_address);
    await tokenApproveTx.wait();
  }

  // for(let i=0; i< indexTokens.length; i++) {
  //     tokenApproveTx = await index.safeApprove(indexTokens[i], swapRouter_address);
  //     await tokenApproveTx.wait();
  //     console.log("i is ", i, indexTokens[i]);
  // }
  // return;

  // for(let i=0; i< indexTokens.length; i++) {
  //     tokenApproveTx = await index.safeApprove(indexTokens[i], swapRouter_address);
  //     await tokenApproveTx.wait();
  //     console.log("i is ", i, indexTokens[i]);
  // }
  // return;


  // let index_token_balance = await index.positionBalance(0, usdt_address);
  // console.log("position balance 0",index_token_balance);

  // let index_token_balance1 = await index.positionBalance(1, usdt_address);
  // console.log("position balance 1", index_token_balance1);
  // return;

  // let tokenBalance = await token.balanceOf(index_address);
  // console.log(ethers.utils.formatUnits(tokenBalance, "6"));

  // let transferTx = await token.transfer(swap_address, ethers.utils.parseUnits("1100", 6));
  // await transferTx.wait();

  // let weth_balance1 = await weth.balanceOf(index_address);
  // console.log(ethers.utils.formatEther(weth_balance1));

  // let index_weth_balance = await index.positionBalance(0, weth_address);
  // console.log(ethers.utils.formatEther(index_weth_balance));


  /// batch deal positions
  let positionIds = [0,1];
  let calldataArray = new Array();
  let positionIdsArray = new Array();


  let positionsBalance = await index.getPositionsBalance(usdt_address, positionIds);
  console.log("positionsBalance is", positionsBalance);
  let amount = Math.floor(positionsBalance.tokenInBalance.div(indexTokens.length));
  console.log("amount is", amount);
  //indexTokens.length
  return;

  for(let i=0; i < indexTokens.length ; i++) {
      let token_address = indexTokens[i];
      let tx = await pathFinder.callStatic.exactInputPath(usdt_address, token_address, amount);
      // let res = await tx.wait();
      console.log(tx);

      if(tx.expectedAmount == 0) {
        console.log("skip address is:", token_address);
        continue;
      }
      let params = {
        path: tx.path,
        recipient: index_address,
        amountIn: amount,
        amountOutMinimum: tx.expectedAmount
      }
      console.log(params);

      /// construct calldata
      let txcalldata = await swap.populateTransaction.exactInput(
          params
      );
      calldataArray.push(txcalldata.data);
      positionIdsArray.push(positionIds);
  }

  console.log(calldataArray);
  console.log(positionIdsArray);

  let tx3 = await index.swapAndSet(
    positionIdsArray,
    calldataArray
  );
  await tx3.wait();
  console.log(tx3.hash);
  return;

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
