// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {

  let provider = hre.ethers.provider;

  let signer = provider.getSigner();
  let my_address = await signer.getAddress();
 
  console.log("my_address:", my_address)

  await hre.run('compile');

  let abi = [
    "event Transfer(address indexed src, address indexed dst, uint val)",
    "event Swap(address indexed sender,address indexed recipient,int256 amount0,int256 amount1,uint160 sqrtPriceX96,uint128 liquidity,int24 tick)",
  ];

  let router_address = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  //let vault = await hre.ethers.getContractAt("ETHVault", vault_address);
  let vault = new ethers.Contract(router_address, abi, signer);

  /// Deposit(address indexed addr, uint256 amount, uint256 fee, uint256 subfee,  uint256 timestamp);

  vault.on("Transfer", (src, event) => {
   // console.log(`${ addr } sent ${ hre.ethers.utils.formatEther(subfee) } fee ${ hre.ethers.utils.formatEther(fee)}`);
    console.log(src)
    // try {
    //   mintFunc(router, addr, subfee);
    // } catch (e) {
    //   console.log(e);
    // }
  });

  return

}

const mintFunc = async function(router, addr, amount) {
    let mint_tx = await router.claimDigi(addr, amount);
    await mint_tx.wait();
    console.log(mint_tx.hash);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});