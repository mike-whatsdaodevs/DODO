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

  let weth_address = process.env.WETH;
  let usdt_address = process.env.USDC;

  let swap_address = "0xf67394B56827246644359D4A3fc0D817dF8E90c0";

  const swap = await ethers.getContractAt('SwapV3', swap_address, signer);
  const token = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", usdt_address, signer);


  let usdt_balance = await token.balanceOf(deployer.address);
  console.log(usdt_balance);

  let override = {
    value : ethers.utils.parseEther("1"),
  }
  
  let amountIn = ethers.utils.parseEther("1");

   // struct ExactInputParams {
    //     bytes path;
    //     address recipient;
    //     uint256 amountIn;
    //     uint256 amountOutMinimum;
    // }

  let path = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc20001f4a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
  let params = {
    path: path,
    recipient: deployer.address,
    amountIn: amountIn,
    amountOutMinimum: 0,
  }
  console.log(params);

  console.log(await token.balanceOf(deployer.address));

  let tx = await swap.mulswap(
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

