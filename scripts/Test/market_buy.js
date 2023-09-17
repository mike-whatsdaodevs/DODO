const { ethers, run } = require('hardhat')
require('dotenv').config({ path: '.env' })

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

  let miner1_address;
  let miner2_address;
  let miner3_address;
  let market_address;
  switch (network) {
  case 5 :
    miner1_address = process.env.G_MINER1;
    miner2_address = process.env.G_MINER2;
    miner3_address = process.env.G_MINER3;
    market_address = process.env.G_MARKET;
    break;
  case 66666 :
    miner1_address = process.env.B_MINER1;
    miner2_address = process.env.B_MINER2;
    miner3_address = process.env.B_MINER3;
    market_address = process.env.B_MARKET;
    break;
  default: 
    miner1_address = process.env.LOCAL_MINER1;
    miner2_address = process.env.LOCAL_MINER2;
    miner3_address = process.env.LOCAL_MINER3;
    market_address = process.env.LOCAL_MARKET;
  }

  let btcc_address = process.env.B_BTCC;
  let miner_address = miner1_address;
  const market = await ethers.getContractAt('MarketPlace', market_address, signer)
  const miner = await ethers.getContractAt('NFTMiner', miner_address, signer)

  // function buy(address nftAddr, uint256 tokenId, uint256 giftCode)
  
  let overrides = {
    value: ethers.utils.parseEther("1")
  }
  let buyTx = await market.buy(
    miner_address,
    6,
    0,
    overrides
  );
  await buyTx.wait();

  let result = await market.getNFT(miner_address, 6);
  console.log(result);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
