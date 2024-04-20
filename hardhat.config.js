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
  solidity: {
    compilers: [
      {
        version: "0.7.0",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            }
        },
      },
      {
        version: "0.8.24",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            }
        },
      },
      {
        version: "0.8.0",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            }
        },
      },
    ]
  },
  networks: {
    goerli: {
      url: process.env.GOERLIURL,
      accounts: 
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    local: {
      url: process.env.LOCAL,
      accounts: 
        process.env.PRIVATE_KEY_LOCAL !== undefined ? [process.env.PRIVATE_KEY_LOCAL] : [],
    }
  },
  mocha: {
    timeout: 40000,
  },
  etherscan: {
    apiKey: {
      btcc: "Jo4nzq1PZTlknkfLht960WfC3J4jMKKX"
    },
    customChains: [
      {
        network: "btcc",
        chainId: 963,
        urls: {
          apiURL: "https://scan.bitcoincode.technology/api",
          browserURL: "https://scan.bitcoincode.technology"
        }
      }
    ]
  }

}
