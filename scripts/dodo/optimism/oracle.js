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


  let priceOracle_address = "0xA7c8B0D74b68EF10511F27e97c379FB1651e1eD2"//process.env.OP_ORACLE_MAIN;
  let weth9_address = process.env.OP_WETH9;
  let usdt_address = process.env.OP_USDT;
  let usdt_eth_500_address = process.env.OP_USDT_ETH_500_PAIR;

  const priceOracle = await ethers.getContractAt('PriceOracle', priceOracle_address, signer)

  let setPoolTx = await priceOracle.setPool(usdt_address, usdt_eth_500_address);
  await setPoolTx.wait();
  console.log("set pool!");

  let ethAmount = await priceOracle.convertToETH(usdt_address, ethers.utils.parseUnits("3000", 6));
  console.log(
  	ethers.utils.formatEther(ethAmount)
  );



}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

