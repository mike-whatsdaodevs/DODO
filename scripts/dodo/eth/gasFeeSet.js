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

  swapRouter_address = process.env.ETH_SWAP_ROUTER_V2;
  dodo_address = process.env.ETH_DODO_MAIN;
  filter_address = process.env.ETH_FILTER_MAIN;
  indexHelper_address = process.env.ETH_INDEX_HELPER_MAIN;

  const dodo = await ethers.getContractAt('DODO', dodo_address, deployer);

  let indexID = 1;

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



  let setGasFeeRecipientTx = await index.setGasFeeRecipient(deployer.address);
  await setGasFeeRecipientTx.wait();
  console.log(setGasFeeRecipientTx.hash);


  let setExchangeRateTx = await index.setExchangeRate(ethers.utils.parseEther("0.0000001"));
  await setExchangeRateTx.wait();
  console.log(setExchangeRateTx.hash);                        
return;
  /// 3000000
  let setStaticGasUsedTx = await index.setStaticGasUsed(3000000);
  await setStaticGasUsedTx.wait();
  console.log(setStaticGasUsedTx.hash);

  let exchangeRate = await index.exchangeRate();
  console.log("exchangeRate :", exchangeRate);

  let gasFeeRecipient = await index.gasFeeRecipient();
  console.log("gasFeeRecipient :", gasFeeRecipient);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
