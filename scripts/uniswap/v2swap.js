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

  const swap = await ethers.getContractAt('SwapV2', swap_address, signer);
  const token = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", usdt_address, signer);


  let usdt_balance = await token.balanceOf(deployer.address);
  console.log(usdt_balance);


  let override = {
    value : ethers.utils.parseEther("1"),
  }

  let tx = await swap.swap(
    ethers.utils.parseEther("1"),
    0,
    [weth_address, usdt_address],
    deployer.address,
    override
  );
  await tx.wait();

  console.log(tx.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

