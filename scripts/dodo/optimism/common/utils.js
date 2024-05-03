const { ethers, run } = require('hardhat')

async function getPositionsBalance(index, tokenAddress, positionIds) {
  let positionsBalance = await index.getPositionsBalance(usdt_address, positionIds);
  return positionsBalance.tokenInBalance;
}

async function uniswapV3PathInfo(pathFinder, tokenIn, tokenOut, amount) {
  let info = await pathFinder.callStatic.exactInputPath(tokenIn, tokenOut, amount);
  return info;
}

async function uniswapV3Calldata(swap, pathinfo, recipient, amountIn) {
   let params = {
    path: pathinfo.path,
    recipient: recipient,
    amountIn:amountIn,
    amountOutMinimum:  pathinfo.expectedAmount
  }
  console.log(params);

  let txcalldata = await swap.populateTransaction.exactInput(
      params
  );
  return txcalldata;
}

async function swapMultiCall(index, calldataArray, positionIds) {
  /// run swap
  let calldataArray = [txcalldata.data];
  let tx3 = await index.swapMultiCall(
    [positionIds],
    calldataArray
  );
  await tx3.wait();
}


async function setPositionsBalance(index, tokenIn, tokenOut, positionIds, skip, size) {
  let hash = await index.hashPositionIds(positionIds, tokenIn, tokenOut);
  console.log(hash);
  let positionIdsHashData = await index.positionIdsHashList(hash);
  console.log(positionIdsHashData);
  let setPositionsBalanceTx = await index.setPositionsBalance(tokenIn, tokenOut, positionIds, skip, size);
  await setPositionsBalanceTx.wait();
}

export const Utils = {
  getPositionsBalance;
  uniswapV3PathInfo;
  uniswapV3Calldata;
  swapMultiCall;
  setPositionsBalance;
}
