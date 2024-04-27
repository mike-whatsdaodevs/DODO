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

  let swapRouterV2_address = process.env.SWAP_ROUTER_V2;
  let weth9_address = process.env.WETH9;

  const Swap = await hre.ethers.getContractFactory('SwapV2')
  const swap = await Swap.deploy(weth9_address, swapRouterV2_address);
  await swap.deployed()
  console.log('swap deployed to:', swap.address)
  
  return;

  // 0xf67394B56827246644359D4A3fc0D817dF8E90c0

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
