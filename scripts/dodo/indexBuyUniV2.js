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
  let usdc_address = process.env.USDC;
  let swapRouter_address = process.env.SWAP_ROUTER_V2;

  let index_address = "0xEDe6D4494Be47A0f5F1FDDf9de477DeeDa495631";

  const index = await ethers.getContractAt('Index', index_address, signer);
  const token = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", usdc_address, signer);
  const weth = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", weth_address, signer);


  let setAllowedProtocolTx = await index.addAllowedProtocols([swapRouter_address]);
  await setAllowedProtocolTx.wait();
  console.log(setAllowedProtocolTx.hash);

  let tokenApproveTx = await index.safeApprove(usdc_address, swapRouter_address);
  await tokenApproveTx.wait();

  let allowance = await token.allowance(index_address, swapRouter_address);
  console.log("allowance is", allowance);

  let index_token_balance = await index.positionBalance(0, usdc_address);
  console.log(index_token_balance);

  let tokenBalance = await token.balanceOf(index_address);
  console.log(ethers.utils.formatUnits(tokenBalance, "6"));

  // let transferTx = await token.transfer(swap_address, ethers.utils.parseUnits("1100", 6));
  // await transferTx.wait();

  let weth_balance1 = await weth.balanceOf(index_address);
  console.log(ethers.utils.formatEther(weth_balance1));

  let index_weth_balance = await index.positionBalance(0, weth_address);
  console.log(ethers.utils.formatEther(index_weth_balance));


  // let tx = await index.uniswapV2(
  //   0,
  //   ethers.utils.parseUnits("300", 6),
  //   0,
  //   [usdc_address, weth_address],
  // );
  // await tx.wait();
  // console.log(tx.hash);

  // let amountIn = ethers.utils.parseUnits("10", 6);
  // let params = {
  //   tokenIn: usdc_address,
  //   tokenOut: weth_address,
  //   fee: 500,
  //   recipient: index_address,
  //   amountIn: amountIn,
  //   amountOutMinimum: 0,
  //   sqrtPriceLimitX96: 0
  // }

  // let tx1 = await index.uniswapV3ExactInputSingle(
  //   0,
  //   params
  // );
  // await tx1.wait();
  // console.log(tx1.hash);

  let path = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb480001f4c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
  let amountIn = ethers.utils.parseUnits("10", 6);
  let params = {
    path: path,
    recipient: index_address,
    amountIn: amountIn,
    amountOutMinimum: 0,
  }

  let tx2 = await index.uniswapV3ExactInput(
    0,
    params
  );
  await tx2.wait();

  console.log(tx2.hash);

  let weth_balance2 = await weth.balanceOf(index_address);
  console.log(ethers.utils.formatEther(weth_balance2));

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

