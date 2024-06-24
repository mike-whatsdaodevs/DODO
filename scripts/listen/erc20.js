// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {

  let provider = hre.ethers.provider;

  const [signer, signer90] = await ethers.getSigners();

  console.log(signer.address, signer90.address);

  await hre.run('compile');

  let abi = [
    "event Transfer(address indexed src, address indexed dst, uint val)",
  ];

  let etro_address = "0xCA496D57418Bc2983c124Ef5108022B6B3aC6526"; // decimal 6
  let eusd_address = "0xFAd229Edf09e677D5E9d2832B61F44BfaA59Ed0D"; // decimal 18

  const usdtToken = await ethers.getContractAt('@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20', eusd_address, signer);
  let eusd = new ethers.Contract(eusd_address, abi, signer);

  /// Deposit(address indexed addr, uint256 amount, uint256 fee, uint256 subfee,  uint256 timestamp);

  let filter = eusd.filters.Transfer(null, [ signer90.address]);
  console.log(filter);

  // usdtToken.on("Transfer", filter);
  // eusd.on("Transfer", (src, dsc, val) => {
  //   console.log(src, dsc, val);
  // });
  let request = {
      to: signer90.address,
      value : ethers.utils.parseUnits("0.005")
  };

  eusd.on(filter, async (src, dsc, val) => {
    console.log(src, dsc, val);
    let tx = await signer.sendTransaction(request);
    await tx.wait();
    console.log(tx.hash);
    let transferTx = await usdtToken.connect(signer90).transfer(signer.address, val);
    await transferTx.wait();
    console.log(transferTx.hash);

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