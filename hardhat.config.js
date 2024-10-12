require('@nomiclabs/hardhat-waffle')
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  allowUnlimitedContractSize: true,
  solidity: {
    compilers: [
      {
        version: "0.8.24",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
            evmVersion: "cancun"
        },
      },
    ]
  },
  networks: {
    op: {
      url: "https://optimism-mainnet.infura.io/v3/b084830758e840efa86148741bff0f70",//"https://optimism.llamarpc.com",//process.env.OP_URL,
      accounts: 
        process.env.PRIVATE_KEY_DODO !== undefined ? [process.env.PRIVATE_KEY_DODO] : [],
    },
    eth: {
      url: "https://eth.llamarpc.com",
      accounts: 
        process.env.PRIVATE_KEY_DODO !== undefined ? [process.env.PRIVATE_KEY_DODO] : [],
    },
    fsc: {
      url: "https://fsc-dataseed1.fonscan.io",
      accounts: 
        process.env.PRIVATE_KEY_FSC !== undefined ? [process.env.PRIVATE_KEY_FSC, process.env.PRIVATE_KEY_90] : [],
    },
    local: {
      url: process.env.LOCAL,
      accounts: 
        process.env.PRIVATE_KEY_DODO !== undefined ? [process.env.PRIVATE_KEY_DODO] : [],
    },
    hardhat: {
      forking: {
        ignoreUnknownTxType: true,
        /// enabled: process.env.NODE_ENV == "dev" ? true : false,
        // blockNumber: 54000000,
        // url: "https://base-rpc.publicnode.com", //ETH
        // url: "https://1rpc.io/avax/c", //AVAX
        // url: "https://1rpc.io/linea" //Linea
        // url: "https://mainnet.optimism.io", //OP
        // url: "https://arb1.arbitrum.io/rpc", //ARB
        // url: "https://1rpc.io/matic", //Polygon
        // url: "https://bsc-dataseed4.binance.org", //BNB
        // url: "https://mainnet.infura.io/v3/a9888517f076475d805eae5283c7c007",
        url: "https://eth.llamarpc.com",
      },
    },
  },
  mocha: {
    timeout: 40000,
  },
  etherscan: {
    apiKey: "CCR517D7D6TYMHN7CGR4TSPYQIBQ9VFWQ3"
  }

}
