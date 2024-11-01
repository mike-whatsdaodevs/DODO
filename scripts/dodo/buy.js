const { ethers, run } = require('hardhat')
require('dotenv').config({ path: '.env' })

async function main() {
  await run('compile')

  let provider = ethers.provider

  console.log('NetWorks ID is ', (await ethers.provider.getNetwork()).chainId)
  console.log('NetWorks Name is ', (await ethers.provider.getNetwork()).name)

  const [deployer] = await ethers.getSigners()

  console.log('deployer:' + deployer.address)

  let weth9_address = process.env.WETH9;
  let usdc_address = process.env.USDC;
  let dodo_address = "0xf67394B56827246644359D4A3fc0D817dF8E90c0";//process.env.DODO;

  const dodo = await ethers.getContractAt('DODO', dodo_address, deployer);
  const usdtToken = await ethers.getContractAt('@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20', usdc_address, deployer);

  let indexAddress = await dodo.indexMap(0);
  console.log(indexAddress);

  let approveTx = await usdtToken.approve(dodo_address, ethers.constants.MaxUint256);
  await approveTx.wait();

  console.log(approveTx.hash);

  let buyTx = await dodo.buy(
    0,
    ethers.utils.parseUnits("1", 6),
    10000,
    100,
    10000
  );

  await buyTx.wait();
  console.log(buyTx.hash);


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
