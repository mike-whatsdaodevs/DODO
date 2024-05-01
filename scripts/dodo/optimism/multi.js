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

  let weth_address = process.env.OP_WETH9;
  let usdt_address = process.env.OP_USDT;

  let swapRouter_address = process.env.OP_SWAP_ROUTER_V2;

  let index_address = "0x0B5f69c70c175331481343e542664d4F1A20Be01";

  const index = await ethers.getContractAt('Index', index_address, signer);
  const token = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", usdt_address, signer);
  const weth = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", weth_address, signer);
  const swap = await ethers.getContractAt('ISwapRouter02', swapRouter_address, signer);

 
  let setAllowedProtocolTx = await index.addAllowedProtocols([swapRouter_address]);
  await setAllowedProtocolTx.wait();
  console.log(setAllowedProtocolTx.hash);

  
  let tokenApproveTx = await index.safeApprove(usdt_address, swapRouter_address);
  await tokenApproveTx.wait();

  let tokenApproveTx1 = await index.safeApprove(weth_address, swapRouter_address);
  await tokenApproveTx1.wait();

  let allowance = await token.allowance(index_address, swapRouter_address);
  console.log("allowance is", allowance);

  let index_token_balance = await index.positionBalance(0, usdt_address);
  console.log("position balance 0",index_token_balance);

  let index_token_balance1 = await index.positionBalance(1, usdt_address);
  console.log("position balance 1", index_token_balance1);

  let tokenBalance = await token.balanceOf(index_address);
  console.log(ethers.utils.formatUnits(tokenBalance, "6"));

  // let transferTx = await token.transfer(swap_address, ethers.utils.parseUnits("1100", 6));
  // await transferTx.wait();

  let weth_balance1 = await weth.balanceOf(index_address);
  console.log(ethers.utils.formatEther(weth_balance1));

  let index_weth_balance = await index.positionBalance(0, weth_address);
  console.log(ethers.utils.formatEther(index_weth_balance));


  let positionIds = [0,1];
  let positionsBalance = await index.getPositionsBalance(usdt_address, positionIds);


  let params = {
    tokenIn: usdt_address,
    tokenOut: weth_address,
    fee: 500,
    recipient: index_address,
    amountIn: positionsBalance.tokenInBalance,
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0
  }
  console.log(params);

  let txcalldata = await swap.populateTransaction.exactInputSingle(
      params
  );
  console.log(txcalldata);

  let calldataArray = [txcalldata.data];
  let tx3 = await index.swapMultiCall(
    [positionIds],
    calldataArray
  );
  await tx3.wait();
  return;


  // let params = {
  //   tokenIn: usdt_address,
  //   tokenOut: weth_address,
  //   fee: 500,
  //   recipient: index_address,
  //   amountIn: positionsBalance.tokenInBalance,
  //   amountOutMinimum: 0,
  //   sqrtPriceLimitX96: 0
  // }

  // console.log("params id", params);

  // let tx1 = await index.swapPositionsV3Single(
  //   positionIds,
  //   params
  // );
  // await tx1.wait();
  // console.log(tx1.hash);


  // let path = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb480001f4c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
  // let amountIn = index_token_balance; //.add(index_token_balance1); //ethers.utils.parseUnits("1098.9", 6) * 2;
  // let params = {
  //   path: path,
  //   recipient: index_address,
  //   amountIn: amountIn,
  //   amountOutMinimum: 0,
  // }

  // let path = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb480001f4c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
  // let amountIn = index_token_balance; //.add(index_token_balance1); //ethers.utils.parseUnits("1098.9", 6) * 2;
  // let params = {
  //   path: path,
  //   recipient: index_address,
  //   amountIn: positionsBalance.tokenInBalance,
  //   amountOutMinimum: 0,
  // }
  // console.log(params);

  // let tx2 = await index.swapPositionsV3ExactInput(
  //   positionIds,
  //   params
  // );
  // await tx2.wait();


  //// set balance;

  let amountOut = ethers.utils.parseEther("0.68");
  let avg = amountOut.div(2);
  let positionIdsLength = positionIds.length;

  let values = new Array(positionIdsLength);
  for(let i = 0; i < positionIdsLength; ++i ) {
      if(i < positionIdsLength - 1) {
        values[i] = avg;
      } else {
        values[i] = amountOut.sub(avg.mul(positionIdsLength - 1));
      }
  }

  let setBalanceTx = await index.setPositionsBalance(
    usdt_address, 
    positionIds, 
    values
  );
  await setBalanceTx.wait();
  console.log("set balance end,", setBalanceTx.hash);

  // let path = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb480001f4c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
  // let amountIn = index_token_balance; //.add(index_token_balance1); //ethers.utils.parseUnits("1098.9", 6) * 2;
  // let params = {
  //   path: path,
  //   recipient: index_address,
  //   amountIn: amountIn,
  //   amountOutMinimum: 0,
  // }

  // console.log(params);

  // let tx2 = await index.swapPositionsV3ExactInput(
  //   [0],
  //   params
  // );
  // await tx2.wait();

  // console.log(tx2.hash);

  let weth_balance2 = await weth.balanceOf(index_address);
  console.log(ethers.utils.formatEther(weth_balance2));

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

