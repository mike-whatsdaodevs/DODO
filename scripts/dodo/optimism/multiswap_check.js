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

  let weth_address = process.env.OP_WETH9;
  let usdt_address = process.env.OP_USDT;

  let swapRouter_address = process.env.OP_SWAP_ROUTER_V2;

  let index_address = "0xD707a2c00cbD8F8fE6ed8E5096AF0055cB8473b7";

  const index = await ethers.getContractAt('Index', index_address, signer);
  const token = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", usdt_address, signer);
  const weth = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", weth_address, signer);
  const swap = await ethers.getContractAt('ISwapRouter02', swapRouter_address, signer);
    
  let positionIds = [0,1]; 
  let hash = await index.hashPositionIds(positionIds, usdt_address, weth_address);
  console.log(hash);

  let positionIdsHashData = await index.positionIdsHashList(hash);
  console.log(positionIdsHashData);

  // let setPositionsBalanceTx = await index.setPositionsBalance(usdt_address, weth_address, positionIds);
  // await setPositionsBalanceTx.wait();


  let positionBalanceIn = await index.positionBalance(0, usdt_address);
  console.log('position 0, usdt is:', positionBalanceIn);

  let positionBalanceOut = await index.positionBalance(0, weth_address);
  console.log('position 0, weth is:', positionBalanceOut);

  let positionStatus = await index.positionStatus(0);
  console.log('positionStatus 0, weth is:', positionStatus);

  let positionBalanceIn1 = await index.positionBalance(1, usdt_address);
  console.log('position 1, usdt is:', positionBalanceIn1);

  let positionBalanceOut1 = await index.positionBalance(1, weth_address);
  console.log('position 1, weth is:', positionBalanceOut1);

  let positionStatus1 = await index.positionStatus(1);
  console.log('positionStatus 1, weth is:', positionStatus1);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

