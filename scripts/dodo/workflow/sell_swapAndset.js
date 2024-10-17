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

  let index0Tokens = [
    process.env.ETH_WETH9,
    process.env.ETH_WBTC,
    process.env.ETH_UNI,
  ];

  let index1Tokens = [
    process.env.ETH_PEPE,
    process.env.ETH_FLOKI,
    process.env.ETH_MOG,
    process.env.ETH_Neiro,
    // process.env.ETH_PAC
  ]

  let indexTokens = index1Tokens;

  let usdt_address = process.env.ETH_USDT;

  let swapRouter_address = process.env.ETH_SWAP_ROUTER_V2;
  let dodo_address = process.env.ETH_DODO_MAIN;
  let filter_address = process.env.ETH_FILTER_MAIN;
  let indexHelper_address = process.env.ETH_INDEX_HELPER_MAIN;
  let pathFinder_address = process.env.ETH_PATH_FINDER_MAIN;

  const dodo = await ethers.getContractAt('DODO', dodo_address, deployer);
  const filter = await ethers.getContractAt('Filter', filter_address, deployer);
  const token = await ethers.getContractAt('@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20', usdt_address, deployer);
  const swap = await ethers.getContractAt('ISwapRouter02', swapRouter_address, deployer);
  const pathFinder = await ethers.getContractAt('PathFinder', pathFinder_address, deployer);

  let indexID = 1;
  let index_address = await dodo.indexMap(indexID);
  console.log(index_address);

  const index = await ethers.getContractAt('Index', index_address, deployer);

  console.log(await filter.getIndexTokens(index_address));

  /// batch deal positions
  let positionIds = [11];
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
        tx = await pathFinder.callStatic.bestExactInputPath(token_address, usdt_address, amount, [process.env.ETH_WETH9]);
      } else {
        tx = await pathFinder.callStatic.bestExactInputPath(token_address, usdt_address, amount, []);
      }
      /// let tx = await pathFinder.callStatic.exactInputPath(token_address, usdt_address, amount);
      // let res = await tx.wait();
      console.log(tx);

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
