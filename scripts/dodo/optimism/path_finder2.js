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

  let pathFinder_address = process.env.OP_PATH_FINDER_MAIN;
  let weth9_address = process.env.OP_WETH9;
  let usdt_address = process.env.OP_USDT;

  const pathFinder = await ethers.getContractAt('PathFinder', pathFinder_address, signer)

  let amount = ethers.utils.parseUnits("100", 6);

  let tx = await pathFinder.callStatic.exactInputPath(usdt_address, weth9_address, amount);
 // let res = await tx.wait();

  decodePath(tx.path);
  console.log(tx);

  // let ethAmount = await priceOracle.convertToETH(token_address, ethers.utils.parseUnits("1", 6));
  // console.log(
  // 	ethers.utils.formatEther(ethAmount)
  // );


}

function decodePath(path) {
    const decodedPath = []

    const pathData = path.slice(2)

    let idx = 0;
    let inputToken

    inputToken = `0x${pathData.slice(idx, idx + 40)}`
    idx += 40;

    while (idx < pathData.length) {
        const fee = parseInt(pathData.slice(idx, idx + 6), 16)
        idx += 6;

        const outputToken = `0x${pathData.slice(idx, idx + 40)}`
        idx += 40;

        decodedPath.push({ inputToken: inputToken, fee, outputToken: outputToken })

        inputToken = outputToken
    }

    console.log(decodedPath)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

