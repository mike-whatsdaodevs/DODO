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

  let usdt_address = process.env.ETH_USDT;

  let swapRouter_address = process.env.ETH_SWAP_ROUTER_V2;
  let dodo_address = process.env.ETH_DODO_MAIN;
  let filter_address = process.env.ETH_FILTER_MAIN;
  let indexHelper_address = process.env.ETH_INDEX_HELPER_MAIN;
  let pathFinder_address = process.env.ETH_PATH_FINDER_MAIN;


  const dodo = await ethers.getContractAt('DODO', dodo_address, deployer);
  const indexhelper = await ethers.getContractAt('IndexHelper', indexHelper_address, signer);
  const pathFinder = await ethers.getContractAt('PathFinder', pathFinder_address, deployer);
  const swap = await ethers.getContractAt('ISwapRouter02', swapRouter_address, signer);

  let transferOwnershipTx = await indexhelper.transferOwnership("0x674323Fcb56106Ed1AB89B7d861dd23e438b81A6");
  await transferOwnershipTx.wait();
  console.log(transferOwnershipTx.hash);

  let removed_token = process.env.ETH_PAC;
  let add_token = process.env.ETH_MOG;

  let indexID = 1;
  let index_address = await dodo.indexMap(indexID);
  console.log(index_address);
  const usdtToken = await ethers.getContractAt('@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20', usdt_address, deployer);
  const index = await ethers.getContractAt('Index', index_address, deployer);
 
  /// batch deal positions
  let positionIds = [2];

  let calldataArray = new Array();
  let positionIdsArray = new Array();

  let tokenBalance = await index.tokenBalance(removed_token);
  console.log("removed_token balance is:", tokenBalance);

  let amount = tokenBalance;
  console.log("amount is", amount);


  let tx = await pathFinder.callStatic.bestExactInputPath(removed_token, add_token, amount, [process.env.ETH_WETH9]);
  // let res = await tx.wait();
  console.log(tx);
  
  if(tx.expectedAmount == 0) {
    console.log("!!! skip address is:", token_address);
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
  console.log(txcalldata.data);

  let tx3 = await indexhelper.switchPositions(
        index_address, 
        txcalldata.data,
        positionIds,
        removed_token,
        add_token
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
