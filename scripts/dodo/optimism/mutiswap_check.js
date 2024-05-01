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

  let index_address = "0x0B5f69c70c175331481343e542664d4F1A20Be01";

  const index = await ethers.getContractAt('Index', index_address, signer);
  const token = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", usdt_address, signer);
  const weth = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", weth_address, signer);
  const swap = await ethers.getContractAt('ISwapRouter02', swapRouter_address, signer);
    
  let positionIds = [0,1]; 
  let hash = await index.hashPositionIds(positionIds);
  console.log(hash);

  let positionIdsHashData = await index.positionIdsHashList(hash);
  console.log(positionIdsHashData);
  return;

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

