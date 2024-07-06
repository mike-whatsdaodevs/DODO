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

  let indexHelper_address = process.env.OP_INDEX_HELPER;

  const dodo = await ethers.getContractAt('DODO', dodo_address, signer);

  let dodoId = await dodo.id();
  console.log(dodoId);
  let index_address = await dodo.indexMap(3);
  console.log(index_address);

  const index = await ethers.getContractAt('Index', index_address, signer);
  const usdt = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", usdt_address, signer);
  const weth = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", weth_address, signer);
  const swap = await ethers.getContractAt('ISwapRouter02', swapRouter_address, signer);
  const pathFinder = await ethers.getContractAt('PathFinder', pathFinder_address, signer);
  const indexHelper = await ethers.getContractAt("IndexHelper", indexHelper_address, signer);


  // let setGasFeeRecipientTx = await index.setGasFeeRecipient(deployer.address);
  // await setGasFeeRecipientTx.wait();
  // console.log(setGasFeeRecipientTx.hash);return;
  // let positionIds1 = await indexHelper.batchGetPositionIdsByStatus(index_address, 4);
  // console.log(positionIds1);return;


  /// batch deal positions
  let positionIds = [0, 1];

  console.log(await index.positionStatus(positionIds[0]));
  console.log(await index.positionStatus(positionIds[1]));
  // console.log(await index.positionStatus(positionIds[2]));
  let positionsBalance0 = await index.positionBalance(positionIds[0], usdt_address);
  console.log(positionsBalance0);
  let positionsBalance1 = await index.positionBalance(positionIds[1], usdt_address);
  console.log(positionsBalance1);
   // let positionsBalance2 = await index.positionBalance(positionIds[2], usdt_address);
   // console.log(positionsBalance2);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
