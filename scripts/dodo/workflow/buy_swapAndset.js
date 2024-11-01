const { ethers, run } = require('hardhat')

async function main() {
  await run('compile')

  let provider = ethers.provider
  let signer = provider.getSigner()

  console.log('NetWorks ID is ', (await ethers.provider.getNetwork()).chainId)
  console.log('NetWorks Name is ', (await ethers.provider.getNetwork()).name)

  const [deployer] = await ethers.getSigners();
  console.log('deployer:' + deployer.address);

  const network = (await ethers.provider.getNetwork()).chainId;
  console.log(network);

  let indexTokens;
  let filter_address;
  let dodo_address;
  let indexHelper_address;
  let pathFinder_address;
  let usdt_address;
  let swapRouter_address;

  if (network == 1) {
    filter_address = process.env.ETH_FILTER_MAIN;
    dodo_address = process.env.ETH_DODO_MAIN;
    indexHelper_address = process.env.ETH_INDEX_HELPER_MAIN;
    pathFinder_address = process.env.ETH_PATH_FINDER_MAIN;
    usdt_address = process.env.ETH_USDT;
    swapRouter_address = process.env.ETH_SWAP_ROUTER_V2;
  } else if(network == 10) {
    filter_address = process.env.OP_FILTER_MAIN;
    dodo_address = process.env.OP_DODO_MAIN;
    indexHelper_address = process.env.OP_INDEX_HELPER_MAIN;
    pathFinder_address = process.env.OP_PATH_FINDER_MAIN;
    usdt_address = process.env.OP_USDT;
    swapRouter_address = process.env.OP_SWAP_ROUTER_V2;
  } else {
    console.log("network error");
    return;
  }

  const dodo = await ethers.getContractAt('DODO', dodo_address, deployer);
  const filter = await ethers.getContractAt('Filter', filter_address, deployer);
  const token = await ethers.getContractAt('@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20', usdt_address, deployer);
  const swap = await ethers.getContractAt('ISwapRouter02', swapRouter_address, deployer);
  const pathFinder = await ethers.getContractAt('PathFinder', pathFinder_address, deployer);
  const indexHelper = await ethers.getContractAt('IndexHelper', indexHelper_address, deployer);

  let indexID = process.env.INDEXID;

  let index_address = await dodo.indexMap(indexID);
  console.log(index_address);

  const index = await ethers.getContractAt('Index', index_address, deployer);

  indexTokens = await filter.getIndexTokens(index_address);
  console.log(indexTokens);

  let allowance = await token.allowance(index_address, swapRouter_address);
  if (allowance == 0) {
    let tokenApproveTx = await index.safeApprove(usdt_address, swapRouter_address);
    await tokenApproveTx.wait();
  }
  /// batch deal positions
  let positionIds = [0];
  let calldataArray = new Array();
  let positionIdsArray = new Array();

  // let index_token_balance = await index.positionBalance(1, usdt_address);
  // console.log("position balance 0",index_token_balance);

  let positionsBalance = await index.getPositionsBalance(usdt_address, positionIds);
  console.log("positionsBalance is", positionsBalance);
  let amount = Math.floor(positionsBalance.tokenInBalance.div(indexTokens.length));
  //let amount = ethers.utils.parseUnits("2", 6);
  console.log("amount is", amount);

  for(let i=0; i < indexTokens.length ; i++) {
      let token_address = indexTokens[i];
      console.log(token_address);
      let tx;
      if(indexTokens[i] == process.env.OP_NEKOCOIN) {
        tx = await pathFinder.callStatic.bestExactInputPath(usdt_address, token_address, amount, [process.env.OP_OP]);
      } else {
        tx = await pathFinder.callStatic.bestExactInputPath(usdt_address, token_address, amount, [process.env.OP_WETH9]);
      }
      // let res = await tx.wait();
      if(tx.expectedAmount == 0) {
        console.log("skip address is:", token_address);
        return;
      }

      let min = tx.expectedAmount.mul(ethers.BigNumber.from("9")).div(ethers.BigNumber.from("10"));
      console.log("tx.expectedAmount :" , tx.expectedAmount);
      console.log("min :", min);
      let params = {
        path: tx.path,
        recipient: index_address,
        amountIn: amount,
        amountOutMinimum: min
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
