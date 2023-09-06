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
  let staking_address;
  let stakingV1_address;
  switch (network) {
  case 5 :
    miner1_address = process.env.G_MINER1;
    miner2_address = process.env.G_MINER2;
    miner3_address = process.env.G_MINER3;
    staking_address = process.env.G_PROXY;
    stakingV1_address = process.env.G_PROXYV1;
    break;
  default: 
    miner1_address = process.env.LOCAL_MINER1;
    miner2_address = process.env.LOCAL_MINER2;
    miner3_address = process.env.LOCAL_MINER3;
    staking_address = process.env.LOCAL_PROXY;
    stakingV1_address = process.env.LOCAL_PROXYV1;
  }

  staking_address = stakingV1_address;
  const staking = await ethers.getContractAt('Staking', staking_address, signer)
  const miner1 = await ethers.getContractAt('NFTMiner', miner1_address, signer)

  let approve_miner_Tx = await miner1.setApprovalForAll(staking_address, true)
  await approve_miner_Tx.wait();
  console.log('approveTx:' + approve_miner_Tx.hash)

  // // // // staking
  let nfts = Array(
    miner1_address,
    miner1_address,
    miner1_address,
    miner1_address,
    miner1_address,
  );

  let ids = Array(
    1, 2, 3, 4, 5
  );

  let stakingTx = await staking.batchStake(nfts, ids);
  console.log('stakingTx:' + stakingTx.hash)
  await stakingTx.wait();

  let totalHashRate = await staking.totalHashRate();
  console.log("totalHashRate is:", totalHashRate);

  let myHashRate = await staking.hashRateOf(deployer.address);
  console.log("myHashRate is:", myHashRate);

  let totalConsumption = await staking.totalConsumption();
  console.log("totalConsumption is:", totalConsumption);

  let myConsumption = await staking.consumptionOf(deployer.address);
  console.log("myConsumption is:", myConsumption);

  // let withdrawAllMinersTx = await staking.withdrawAllMiners()
  // console.log('withdrawAllMinersTx:' + withdrawAllMinersTx.hash)
  // await withdrawAllMinersTx.wait()

  // return;

  // // let rewardRate = await staking.rewardRate()
  // // console.log('rewardRate: ' + rewardRate)

  // let earned = await staking.earned(deployer.address)
  // console.log('earned: ', earned)

  // let consumption = await staking.consumption(deployer.address)
  // console.log('consumption: ' , consumption)

  // let minerAmountOf = await staking.minerAmountOf(deployer.address)
  // console.log('minerAmountOf: ' + minerAmountOf)

  // // amount
  // // let amount = await token.balanceOf(deployer.address)
  // // console.log('amount: ' + amount)
  // // approve
  // let approveTx = await token.approve(staking_address, ethers.constants.MaxUint256)
  // console.log('approveTx: ' + approveTx.hash)
  // await approveTx.wait()

  // let rewardTx = await staking.getReward()
  // console.log('rewardTx: ' + rewardTx.hash)
  // await rewardTx.wait()

  // return;

  // approve
  // let approveTokenTx = await token.approve(process.env.STAKING, consumption)
  // console.log('approveTokenTx:' + approveTokenTx.hash)
  // await approveTokenTx.wait()

  // let withdrawTx = await staking.withdrawMiner(4)
  // console.log('withdrawTx:' + withdrawTx.hash)
  // await withdrawTx.wait()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
