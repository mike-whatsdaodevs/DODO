// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat')

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  // We get the contract to deploy

  // 0x4BE6339E1480761e650D2F2Eb27a702dD458654A
  let provider = ethers.provider
  const [signer] = await ethers.getSigners()
  let my_address = signer.address;
  console.log('my_address is:', my_address)

  let chainID = (await ethers.provider.getNetwork()).chainId;
  if (chainID == 31337n) {
    await network.provider.send("hardhat_setBalance", [signer.address, "0x1000000000000000000000000"]);
  }
  let quoterv2_address = process.env.ETH_QUOTER_V2;

  console.log(await provider.getBalance(signer.address));

  const PathFinder = await hre.ethers.getContractFactory('PathFinder')
  const pathFinder = await PathFinder.deploy(quoterv2_address, []);
  await pathFinder.deployed()
  console.log('pathFinder deployed to:', pathFinder.address)
  return;

  // 0xf67394B56827246644359D4A3fc0D817dF8E90c0

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
