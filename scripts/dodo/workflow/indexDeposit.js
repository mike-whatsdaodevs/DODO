const { ethers, run } = require('hardhat')
require('dotenv').config({ path: '.env' })

async function main() {
  await run('compile')

  let provider = ethers.provider

  console.log('NetWorks ID is ', (await ethers.provider.getNetwork()).chainId)
  console.log('NetWorks Name is ', (await ethers.provider.getNetwork()).name)

  const [deployer] = await ethers.getSigners()
  console.log('deployer:' + deployer.address)

  const network = (await ethers.provider.getNetwork()).chainId;
  console.log(network);

  let filter_address;
  let dodo_address;
  let indexHelper_address;
  let usdt_address;

  if (network == 1) {
    filter_address = process.env.ETH_FILTER_MAIN;
    dodo_address = process.env.ETH_DODO_MAIN;
    indexHelper_address = process.env.ETH_INDEX_HELPER_MAIN;
    usdt_address = process.env.ETH_USDT;
  } else if(network == 10) {
    filter_address = process.env.OP_FILTER_MAIN;
    dodo_address = process.env.OP_DODO_MAIN;
    indexHelper_address = process.env.OP_INDEX_HELPER_MAIN;
    usdt_address = process.env.OP_USDT;
  } else {
    console.log("network error");
    return;
  }

  const dodo = await ethers.getContractAt('DODO', dodo_address, deployer);

  /// console.log(await dodo.indexSingleton());return;

  let indexID = process.env.INDEXID;
  
  let index_address = await dodo.indexMap(indexID);
  console.log(index_address);
  const usdtToken = await ethers.getContractAt('@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20', usdt_address, deployer);
  const index = await ethers.getContractAt('Index', index_address, deployer);
  
  let allowance = await usdtToken.allowance(deployer.address, dodo_address);
  console.log(allowance);
  if(allowance == 0) {
      let approveTx = await usdtToken.approve(dodo_address, ethers.constants.MaxUint256);
      await approveTx.wait();
      console.log(approveTx.hash);
  } 

  // let indexDepisitTx = await index.createPosition(
  //   deployer.address,
  //   ethers.utils.parseUnits("2", 6),
  //   10000,
  //   100,
  //   10000
  // );
  // await indexDepisitTx.wait();
  // console.log(indexDepisitTx.hash);
  // return;
  // function createPosition(
  //       address initialOwner, 
  //       uint256 amount,
  //       uint128 currentIndex,
  //       uint128 healthFactor,
  //       uint256 expiration
  //   )

  let buyTx = await dodo.buy(
    indexID,
    ethers.utils.parseUnits("2", 6),
    10000,
    100,
    10000
  );

  await buyTx.wait();
  console.log(buyTx.hash);
  console.log(await index.positionId());

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
