const { ethers, run } = require('hardhat')

async function main() {
  await run('compile')

  let provider = ethers.provider
  let signer = provider.getSigner()

  console.log('NetWorks ID is ', (await ethers.provider.getNetwork()).chainId)
  console.log('NetWorks Name is ', (await ethers.provider.getNetwork()).name)

  const [deployer] = await ethers.getSigners()
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

  let indexID = process.env.INDEXID;

  let index_address = await dodo.indexMap(indexID);
  console.log(index_address);
  const usdtToken = await ethers.getContractAt('@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20', usdt_address, deployer);
  const index = await ethers.getContractAt('Index', index_address, deployer);

  let indexOwner = await index.owner();
  console.log("index owner is :", indexOwner);

  let gasUsed = await index.gasUsed();
  console.log("gas used :", gasUsed);

  let averageGasUsed = await index.averageGasUsed();
  console.log("averageGasUsed used :", averageGasUsed);

  let staticGasUsed = await index.staticGasUsed();
  console.log("staticGasUsed used :", staticGasUsed);

  let feeRate = await index.feeRate();
  console.log("feeRate :", feeRate);

  /// set

  // let manageFeeRateJson = await index.populateTransaction.manageFeeRate(100);
  // console.log(manageFeeRateJson);

  // let manageFeeRateTx = await dodo.managerIndex(indexID, manageFeeRateJson.data);
  // await manageFeeRateTx.wait();
  // console.log(manageFeeRateTx.hash)
  // return;

  // let setGasFeeRecipientJson = await index.populateTransaction.updateGasFeeRecipient(deployer.address);
  // console.log(setGasFeeRecipientJson);
  // let callTx1 = await dodo.managerIndex(indexID, setGasFeeRecipientJson.data);
  // await callTx1.wait();
  // console.log(callTx1.hash)

  // let updateGasBasefeeJson = await index.populateTransaction.updateGasBasefee(ethers.utils.parseUnits("5", 9));
  // console.log(updateGasBasefeeJson);
  // let callTx2 = await dodo.managerIndex(indexID, updateGasBasefeeJson.data);
  // await callTx2.wait();
  // console.log(callTx2.hash);


  // let updateGasExchangePriceJson = await index.populateTransaction.updateGasExchangePrice(2650);
  // console.log(updateGasExchangePriceJson);
  // let callTx3 = await dodo.managerIndex(indexID, updateGasExchangePriceJson.data);
  // await callTx3.wait();
  // console.log(callTx3.hash)

  // let updateGasStaticGasUsedJson = await index.populateTransaction.updateGasStaticGasUsed(1500000);
  // console.log(updateGasStaticGasUsedJson);
  // let callTx4 = await dodo.managerIndex(indexID, updateGasStaticGasUsedJson.data);
  // await callTx4.wait();
  // console.log(callTx4.hash)


  // let setExchangeRateTx = await index.setExchangePrice(2650);
  // await setExchangeRateTx.wait();
  // console.log(setExchangeRateTx.hash);                        

  // /// 3000000
  // let setStaticGasUsedTx = await index.setStaticGasUsed(1500000);
  // await setStaticGasUsedTx.wait();
  // console.log(setStaticGasUsedTx.hash);

  // let setBaseFeeTx = await index.setBaseFee(ethers.utils.parseUnits("1", 6));
  // await setBaseFeeTx.wait();
  // console.log(setBaseFeeTx.hash); 



  let exchangeRate = await index.exchangePrice();
  console.log("exchangeRate :", exchangeRate);

  let gasFeeRecipient = await index.gasFeeRecipient();
  console.log("gasFeeRecipient :", gasFeeRecipient);

  let basefee = await index.basefee();
  console.log("basefee: ", basefee);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
