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

  /// batch deal positions
  let positionIds = [0];
  let calldataArray = new Array();
  let positionIdsArray = new Array();

  for(let i=0; i < indexTokens.length ; i++) {
      let positionsBalance = await index.getPositionsBalance(indexTokens[i], positionIds);
      let amount = positionsBalance.tokenInBalance;
      console.log("token balance is:", amount);

      // let hash = await index.hashPositionIds(positionIds, usdt_address, indexTokens[i]);
      // let positionIdsHashData = await index.positionIdsHashList(hash);
      // console.log("position data is", positionIdsHashData);

      // continue;

      let token_address = indexTokens[i];

      console.log("token_address is :", token_address);

      let tx;
      if(indexTokens[i] == process.env.ETH_MOG || indexTokens[i] == process.env.ETH_Neiro) {
        tx = await pathFinder.callStatic.bestExactInputPath(token_address, usdt_address, amount, [process.env.OP_WETH9]);
      } else {
        tx = await pathFinder.callStatic.bestExactInputPath(token_address, usdt_address, amount, [process.env.OP_WETH9]);
      }
      /// let tx = await pathFinder.callStatic.exactInputPath(token_address, usdt_address, amount);
      // let res = await tx.wait();
      console.log(tx);
      let min = tx.expectedAmount.mul(ethers.BigNumber.from("9")).div(ethers.BigNumber.from("10"));
      console.log("tx.expectedAmount :" , tx.expectedAmount);
      console.log("min :", min);

      if(tx.expectedAmount == 0) {
        console.log("skip address is:", token_address);
        return;
      }
      let params = {
        path: tx.path,
        recipient: index_address,
        amountIn: amount,
        amountOutMinimum: 0
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


  let tx = await indexHelper.sellAndWithdraw(
    index_address,
    positionIdsArray,
    calldataArray,
    positionIds
  );
  await tx.wait();
  console.log(tx.hash);
  return;

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
