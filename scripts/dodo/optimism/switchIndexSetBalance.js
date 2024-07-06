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
  let indexTokens = [
    DAI_ADDRESS
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

  let dodoId = await dodo.id();
  console.log(dodoId);
  let index_address = await dodo.indexMap(3);
  console.log("index_address :", index_address);

  const index = await ethers.getContractAt('Index', index_address, signer);
  const token = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", usdt_address, signer);
  const weth = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", weth_address, signer);
  const swap = await ethers.getContractAt('ISwapRouter02', swapRouter_address, signer);
  const pathFinder = await ethers.getContractAt('PathFinder', pathFinder_address, signer);

  let amount = await index.tokenSwithAmount(removed_token, DAI_ADDRESS);
  console.log("amount before is:", amount);

  let tokenBalance = await index.tokenBalance(DAI_ADDRESS);
  console.log("dai balance is:", tokenBalance);
  console.log("formated dai balance is:", ethers.utils.formatEther(tokenBalance));

  let snxtokenBalance = await index.tokenBalance(removed_token);
  console.log("snx balance is:", snxtokenBalance);
  let positionIds = [7, 8];

  let positionbalance0 = await index.positionBalance(positionIds[0], removed_token);
  let positionbalance1 = await index.positionBalance(positionIds[1], removed_token);
  // let positionbalance2 = await index.positionBalance(positionIds[2], removed_token);

  console.log(positionbalance0, positionbalance1);

  let positionbalance01 = await index.positionBalance(positionIds[0], DAI_ADDRESS);
  let positionbalance11 = await index.positionBalance(positionIds[1], DAI_ADDRESS);
//  let positionbalance02 = await index.positionBalance(positionIds[2], DAI_ADDRESS);
  console.log(ethers.utils.formatEther(positionbalance01), ethers.utils.formatEther(positionbalance11));
  return;
  let tx = await index.setPositionsSwithBalance(
    removed_token, 
    DAI_ADDRESS, 
    positionIds
  );
  await tx.wait();
  console.log(tx.hash);


  let setSwithCounter = await index.setSwithCounter();
  console.log("set left :", setSwithCounter);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
