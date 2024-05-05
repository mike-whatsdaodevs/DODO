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

  let weth_address;
  let usdt_address;
  let pathFinder_address;
  let swapRouter_address;
  let indexTokens = [
    process.env.OP_USDC,
    process.env.OP_WETH9,
    process.env.OP_WBTC,
    process.env.OP_LINK,
    process.env.OP_OP,
    process.env.OP_WLD,
    // process.env.OP_LDO,
    // process.env.OP_W,
    // process.env.OP_PYTH,
    process.env.OP_SNX
  ];
  if(network == 10) {
    weth_address = process.env.OP_WETH9;
    usdt_address = process.env.OP_USDT;
    pathFinder_address =  process.env.OP_PATH_FINDER_MAIN;
    swapRouter_address = process.env.OP_SWAP_ROUTER_V2;
  } else if(network == 31337) {
    weth_address = process.env.OP_WETH9;
    usdt_address = process.env.OP_USDT;
    pathFinder_address =  process.env.OP_PATH_FINDER_MAIN;
    swapRouter_address = process.env.OP_SWAP_ROUTER_V2;
  } else {

  }

  let index_address = "0x0B5f69c70c175331481343e542664d4F1A20Be01";

  const index = await ethers.getContractAt('Index', index_address, signer);
  const token = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", usdt_address, signer);
  const weth = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", weth_address, signer);
  const swap = await ethers.getContractAt('ISwapRouter02', swapRouter_address, signer);
  const pathFinder = await ethers.getContractAt('PathFinder', pathFinder_address, signer);


  /// batch deal positions
  let positionIds = [0,1];

  for(let i=0; i < indexTokens.length; i ++) {
      let token = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", indexTokens[i], signer);

      let balance = await token.balanceOf(index_address);
      console.log(balance);
      let positionsBalance1 = await index.getPositionsBalance(indexTokens[i], positionIds);
      console.log(positionsBalance1);
      // ////set positionBalance
      // let hash = await index.hashPositionIds(positionIds, usdt_address, indexTokens[i]);
      // console.log(hash);
      // let positionIdsHashData = await index.positionIdsHashList(hash);
      // console.log(positionIdsHashData);
      let setPositionsBalanceTx = await index.setPositionsBalance(usdt_address, indexTokens[i],positionIds, 0, positionIds.length);
      await setPositionsBalanceTx.wait();

      // console.log(setPositionsBalanceTx.hash);

      // let positionsBalance2 = await index.getPositionsBalance(indexTokens[i], positionIds);
      // console.log(positionsBalance2);
      // return;
  }

  return;




  // let amountOut = ethers.utils.parseEther("0.68");
  // let avg = amountOut.div(2);
  // let positionIdsLength = positionIds.length;

  // let values = new Array(positionIdsLength);
  // for(let i = 0; i < positionIdsLength; ++i ) {
  //     if(i < positionIdsLength - 1) {
  //       values[i] = avg;
  //     } else {
  //       values[i] = amountOut.sub(avg.mul(positionIdsLength - 1));
  //     }
  // }

  // let setBalanceTx = await index.setPositionsBalance(
  //   usdt_address, 
  //   positionIds, 
  //   values
  // );
  // await setBalanceTx.wait();
  // console.log("set balance end,", setBalanceTx.hash);

  let weth_balance2 = await weth.balanceOf(index_address);
  console.log(ethers.utils.formatEther(weth_balance2));

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
