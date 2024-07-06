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
  let indexTokens = [
    process.env.OP_USDC,
    process.env.OP_WETH9,
    process.env.OP_WBTC,
    process.env.OP_LINK,
    process.env.OP_OP,
    process.env.OP_WLD,
    // process.env.OP_LDO,
    // process.env.OP_W,
    // process.env.OP_PYTH,
    process.env.OP_SNX
  ];
  if(network == 10) {
    weth_address = process.env.OP_WETH9;
    usdt_address = process.env.OP_USDT;
    pathFinder_address =  process.env.OP_PATH_FINDER_MAIN;
    swapRouter_address = process.env.OP_SWAP_ROUTER_V2;
    dodo_address = process.env.OP_DODO_MAIN;
  } else if(network == 31337) {
    weth_address = process.env.OP_WETH9;
    usdt_address = process.env.OP_USDT;
    pathFinder_address =  process.env.OP_PATH_FINDER_MAIN;
    swapRouter_address = process.env.OP_SWAP_ROUTER_V2;
    dodo_address = process.env.OP_DODO_LOCAL;
  } else {

  }

  const dodo = await ethers.getContractAt('DODO', dodo_address, signer);


  let index_address = await dodo.indexMap(2);
  console.log(index_address);

  const index = await ethers.getContractAt('Index', index_address, signer);
  const token = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", usdt_address, signer);
  const weth = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", weth_address, signer);
  const swap = await ethers.getContractAt('ISwapRouter02', swapRouter_address, signer);
  const pathFinder = await ethers.getContractAt('PathFinder', pathFinder_address, signer);


  let indexOwner = await index.owner();
  console.log("index owner is :", indexOwner);

  let gasUsed = await index.gasUsed();
  console.log("gas used :", gasUsed);

  let averageGasUsed = await index.averageGasUsed();
  console.log("averageGasUsed used :", averageGasUsed);

  let staticGasUsed = await index.staticGasUsed();
  console.log("staticGasUsed used :", staticGasUsed);

  let exchangeRate = await index.exchangeRate();
  console.log("exchangeRate :", exchangeRate);

  let gasFeeRecipient = await index.gasFeeRecipient();
  console.log("gasFeeRecipient :", gasFeeRecipient);

  let positionsGasUsedAverage = await index.positionsGasUsedAverage(5);
  console.log("positionsGasUsedAverage :", positionsGasUsedAverage);
  return;

  let setGasFeeRecipientTx = await index.setGasFeeRecipient(deployer.address);
  await setGasFeeRecipientTx.wait();
  console.log(setGasFeeRecipientTx.hash);


  let setExchangeRateTx = await index.setExchangeRate(ethers.utils.parseEther("0.0001"));
  await setExchangeRateTx.wait();
  console.log(setExchangeRateTx.hash);

  /// 3000000
  let setStaticGasUsedTx = await index.setStaticGasUsed(3000000);
  await setStaticGasUsedTx.wait();
  console.log(setStaticGasUsedTx.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
