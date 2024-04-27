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

  let uniswapRouter_address = process.env.SWAP_ROUTER_V2;

  let swap_address = "0xf67394B56827246644359D4A3fc0D817dF8E90c0";

  const swap = await ethers.getContractAt('SwapV3', swap_address, signer);
  const token = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", usdt_address, signer);
  const weth = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", weth_address, signer);


  
  let path = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb480001f4c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

  let res = await swap.decodePath(path);
  console.log(res);

  let tokenApproveTx = await swap.tokenApprove(usdt_address, uniswapRouter_address);
  await tokenApproveTx.wait();

  let allowance = await token.allowance(swap_address, uniswapRouter_address);
  console.log("allowance is", allowance);

  let transferTx = await token.transfer(swap_address, ethers.utils.parseUnits("100", 6));
  await transferTx.wait();

  let weth_balance1 = await weth.balanceOf(deployer.address);
  console.log(ethers.utils.formatEther(weth_balance1));

  let amountIn = ethers.utils.parseUnits("100", 6);



  let params = {
    path: path,
    recipient: deployer.address,
    amountIn: amountIn,
    amountOutMinimum: "30276092743516702",
  }
  console.log(params);

  let tx = await swap.mulswap(
    params
  );
  await tx.wait();

  console.log(tx.hash);
  let weth_balance2 = await weth.balanceOf(deployer.address);
  console.log(ethers.utils.formatEther(weth_balance2));

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

