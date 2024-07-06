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
  let removed_token = process.env.OP_SNX;
  let filter_address;
  let indexHelper_address;
  let indexTokens = [
    DAI_ADDRESS
  ];
  if(network == 10) {
    weth_address = process.env.OP_WETH9;
    usdt_address = process.env.OP_USDT;
    pathFinder_address =  process.env.OP_PATH_FINDER_MAIN;
    swapRouter_address = process.env.OP_SWAP_ROUTER_V2;
    dodo_address = process.env.OP_DODO_MAIN;
    filter_address = process.env.OP_FILTER;
    indexHelper_address = process.env.OP_INDEX_HELPER;
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
  let index_address = await dodo.indexMap(3);
  console.log("index_address :", index_address);

  const index = await ethers.getContractAt('Index', index_address, signer);
  const filter = await ethers.getContractAt('Filter', filter_address, deployer);
  const token = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", usdt_address, signer);
  const weth = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", weth_address, signer);
  const swap = await ethers.getContractAt('ISwapRouter02', swapRouter_address, signer);
  const pathFinder = await ethers.getContractAt('PathFinder', pathFinder_address, signer);
  const indexhelper = await ethers.getContractAt('IndexHelper', indexHelper_address, signer);


  // let tokenApproveTx = await index.safeApprove(DAI_ADDRESS, swapRouter_address);
  // await tokenApproveTx.wait();

  // // let tokenApproveTx1 = await index.safeApprove(removed_token, swapRouter_address);
  // // await tokenApproveTx.wait();
  console.log(await filter.getIndexTokens(index_address));

  // let changeIndexTokenTx = await indexhelper.changeIndexTokens(
  //   index_address, 
  //   [DAI_ADDRESS], 
  //   [removed_token]
  // );

  // console.log(await filter.getIndexTokens(index_address));
  // return;


  // let updateTokensTx = await pathFinder.updateTokens([weth_address, usdt_address]);
  // await updateTokensTx.wait();
  // console.log(updateTokensTx.hash);
  // console.log(await pathFinder.getSharedTokens());
  // console.log(await index.counter(7));

  /// batch deal positions
  let positionIds = [7, 8];


  let calldataArray = new Array();
  let positionIdsArray = new Array();

  let tokenBalance = await index.tokenBalance(removed_token);
  console.log("removed_token balance is:", tokenBalance);

  let amount = tokenBalance;
  console.log("amount is", amount);

  let tx = await pathFinder.callStatic.exactInputPath(removed_token, DAI_ADDRESS, amount);
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
        DAI_ADDRESS
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
