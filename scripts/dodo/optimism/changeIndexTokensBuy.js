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
  let DAI_ADDRESS = "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1";
  let snx_address = process.env.OP_SNX;

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

  const dodo = await ethers.getContractAt('DODO', dodo_address, signer);

  let dodoId = await dodo.id();
  console.log(dodoId);
  let index_address = await dodo.indexMap(0);
  console.log(index_address);

  const filter = await ethers.getContractAt('Filter', filter_address, deployer);
  const index = await ethers.getContractAt('Index', index_address, signer);
  const token = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", usdt_address, signer);
  const weth = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", weth_address, signer);
  const swap = await ethers.getContractAt('ISwapRouter02', swapRouter_address, signer);
  const pathFinder = await ethers.getContractAt('PathFinder', pathFinder_address, signer);

  // let tokenApproveTx = await index.safeApprove(DAI_ADDRESS, swapRouter_address);
  // await tokenApproveTx.wait();
  // return;

  // let removeIndexTokensTx = await filter.removeIndexTokens([snx_address]);
  // await removeIndexTokensTx.wait();
  // console.log(removeIndexTokensTx.hash);
  // let addIndexTokensTx = await filter.addIndexTokens([DAI_ADDRESS]);
  // await addIndexTokensTx.wait();
  // return;

  /// batch deal positions
  let positionIds = [6,7];
  let calldataArray = new Array();
  let positionIdsArray = new Array();


  let positionsBalance = await index.getPositionsBalance(usdt_address, positionIds);
  console.log("positionsBalance is", positionsBalance);
  return;


  let amount = Math.floor(positionsBalance.tokenInBalance.div(indexTokens.length));
  console.log("amount is", amount);
  //indexTokens.length
  
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

  let tx3 = await index.swapMultiCall(
    positionIdsArray,
    calldataArray
  );
  await tx3.wait();
  console.log(tx3.hash);
  return;

  ////set positionBalance
  let hash = await index.hashPositionIds(positionIds, usdt_address, weth_address);
  console.log(hash);
  let positionIdsHashData = await index.positionIdsHashList(hash);
  console.log(positionIdsHashData);
  let setPositionsBalanceTx = await index.setPositionsBalance(usdt_address, weth_address,positionIds, 0, positionIds.length);
  await setPositionsBalanceTx.wait();
  return;


  // let amountOut = ethers.utils.parseEther("0.68");
  // let avg = amountOut.div(2);
  // let positionIdsLength = positionIds.length;

  // let values = new Array(positionIdsLength);
  // for(let i = 0; i < positionIdsLength; ++i ) {
  //     if(i < positionIdsLength - 1) {
  //       values[i] = avg;
  //     } else {
  //       values[i] = amountOut.sub(avg.mul(positionIdsLength - 1));
  //     }
  // }

  // let setBalanceTx = await index.setPositionsBalance(
  //   usdt_address, 
  //   positionIds, 
  //   values
  // );
  // await setBalanceTx.wait();
  // console.log("set balance end,", setBalanceTx.hash);

  let weth_balance2 = await weth.balanceOf(index_address);
  console.log(ethers.utils.formatEther(weth_balance2));

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
