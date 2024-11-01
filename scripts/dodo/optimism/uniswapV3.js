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

  let swap_address = "0xE9061F92bA9A3D9ef3f4eb8456ac9E552B3Ff5C8";

  const swap = await ethers.getContractAt('SwapV3', swap_address, signer);
  const token = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", usdt_address, signer);


  let usdt_balance = await token.balanceOf(deployer.address);
  console.log(usdt_balance);

  let override = {
    value : ethers.utils.parseEther("5"),
  }

  
  let amountIn = ethers.utils.parseEther("5");

  let params = {
    tokenIn: weth_address,
    tokenOut: usdt_address,
    fee: 500,
    recipient: deployer.address,
    amountIn: amountIn,
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0
  }
  console.log(params);

  console.log(await token.balanceOf(deployer.address));

  let tx = await swap.swap(
    params,
    override
  );
  await tx.wait();

  console.log(tx.hash);
  console.log(await token.balanceOf(deployer.address));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

