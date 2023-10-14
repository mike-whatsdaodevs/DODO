let data = [
// ["0x11291CC62F426392405bd198701A40A227B6b87F",5],
// ["0xEaA52AE01D78BD974790007251102Cb9a40a501c",4],
// ["0x5b67f77bF8215E8D8b4aCC568FD60fC5BA28417E",1],
// ["0x9066ae7E43795710c0cEa4E83C9a8270Ffa9E1d4",4],
// ["0x924F0dc06b4A1BCeA99639678980A504721Ad7E4",4],
// ["0xa4C6d879469AB6ff264f0EC5b4f1Dfd197EF3584",5],
// ["0xd67F4653e118B377A3A1f488eEFb12906445541D",2],
// ["0x33e9A14c927bAD3460Ff2bfF4f749c886F5b03c3",1],
// ["0x4B5099b44e3e44170983b761E8eBf5E05aa79B26",1],
// ["0xBb6993b6240850eFaD1415AdD3F3a528548f432a",5],
// ["0xfa42F7A96846d282471ABb61dCa407EDc4c2e561",5],
// ["0xfa42F7A96846d282471ABb61dCa407EDc4c2e561",5],
// ["0x73f37EeCF3aFDae19aB9bB520a051EEf11959371",4],
// ["0x1A03c7bcA6226A9706A3A3C98Fac80464cAB7BDF",1],
// ["0xC2F6818123FBBab0dd3F968615bF5d3Dc5Aa6Fd7",3],
// ["0x89BC7ede880A9304E8A5F5A723652910a5c0832a",5],
// ["0x33e9A14c927bAD3460Ff2bfF4f749c886F5b03c3",1],
// ["0xE3d59Ed507C122C0F53A0d75A16Bc0CB21C3d949",1],
// ["0xa4C6d879469AB6ff264f0EC5b4f1Dfd197EF3584",1],
// ["0x1A03c7bcA6226A9706A3A3C98Fac80464cAB7BDF",1],
// ["0x33e9A14c927bAD3460Ff2bfF4f749c886F5b03c3",1],
// ["0x61a6A0d04C8dafc5863060c44079007Cfac636f2",1],
// ["0x409D0c840169a693b977a0a94f9Bd226c0DAA9aA",1],
// ["0x0ECB89C121b759b6284d9e225364c76bfa1AEabB",1],
// ["0x61a6A0d04C8dafc5863060c44079007Cfac636f2",1],
// ["0xaD5BC4e80996d2925F091f24B943a28B9AA3755B",1],
// ["0x9a433C536D415f67Bc5E59a54e5Afd541b27E1C9",1],
// ["0xA6574C8807EaEDA0c863B9A41cb697a0bd21df25",2],
// ["0xB77066728FEc8b92A5591Fd1B85DAF85b16eF743",1],
// ["0x924F0dc06b4A1BCeA99639678980A504721Ad7E4",3],
// ["0x9Be1DE00379D4F18d014b7e65066ef5f1De0C84e",9],
// ["0xF9F342828d2619B38217968829D8a5972744C6AF",9],
// ["0x68435c8Beca5c32D08c45F3332b6c824355b4cD6",2],
// ["0x314186a7a38B3f4b01C255e8A20F195BeFADfb0d",4],
// ["0xfa42F7A96846d282471ABb61dCa407EDc4c2e561",5],
// ["0x97cDF5490700bFA885840184322593f3F47D4737",1],
// ["0x812EBC584ea1A4126B5A945780871aE5aef019Cd",1],
// ["0xdc1025DC953727caC94Cf3a9BCa3bBD1fAc99E12",1],
// ["0xE774438527CEC1205023A60EFAE50FD5f08d88eB",4],
// ["0x33e9A14c927bAD3460Ff2bfF4f749c886F5b03c3",1],
// ["0x077Ae73c00E6b162FC7Fb34940D30c31498F68Ea",5],
// ["0xF28ccb37DD38443A259dc1B35814898563b884a6",4],
// ["0xb143fBb06bbf6b76539Bd5bB82B84B1D0A231124",6],
// ["0x219F68Edbb96835383A036f50eC0aC2FC5159FcA",1],
// ["0x210790e3E0d62ffc5215c5605Bcbcb90b46C6dEb",21],
// ["0x33e9A14c927bAD3460Ff2bfF4f749c886F5b03c3",1],
// ["0xeA8810F25bd743CB8d618ddea21e378999007588",23],
// ["0x791df80B60Aaf934b8c9D680dcac658B5DD114CE",2],
// ["0x8894EA549363AA75bB20572D9E707a0b3b2994f6",15],
// ["0xC799374688228bB929e07EAFF61767a6CBFF4300",4],
// ["0xc5845035Fc1290e0119Bf2561D727eAf631e75DB",1],
// ["0xd8dc670846ad2469C2f2DB53a9540Cd0aABF17Cf",1],
// ["0x07cB6c751694f0dfEF01F28d4FAC3CDeB4fB64Cc",1],
// ["0xb50467BF31344eecC4f0Bf0ccE65D6d0e661a525",1],
// ["0x56D4d758d738FB66C91f99972f2DCFa7353051e1",1],
// ["0xfaE3Aa64E808Af19F0FB407D140457A57c3362a4",1],
// ["0x71eFf0b02a5B23F42d8Edf9c48Aa66CD260AB059",1],
// ["0xdBEECc2325D41b9621E0EE22C8ee93f9A8B327C9",1],
// ["0xcCCf3a0d602387819acD6AFEeb459b91b5EfEc89",1],
// ["0x0Ced2CB970A5aC8bC9E9F357939690096BFA355A",1],
// ["0xbABDf07A2B587ea551cD167021626c28ea3ad40A",5],
// ["0x976D8a40635ed01722cf3b0f696Ff791239e5b16",3],
// ["0x1A0ED06a985Bf18d1f3C54D13471Be264B0eE3d2",1],
// ["0x063D65113746Eaf52ad627b7e0AE2CDE0bBa5bc2",1],
// ["0x96b11a3f53c243bA4fdA1b20f00C148a49361ade",3],
// ["0x7d5A919A84238aeD17eF402092E133a40A22df39",9],
// ["0x659a44c10420F4B7624652c45E9012C7ae31a996",1],
// ["0x8aa26b8a840E074Af7d629751a939C3D6E6F8D82",4],
// ["0xc5865Af6739531aD7269DFcFE454e7B960bd5df8",1],
// ["0x23101A4A924Cd24400D71712db54005E9545D0b7",1],
// ["0x01dA40E26fC5C8716b9b742A6F34C5394FF22Ce7",1],
// ["0x73b367d43c28E9E9022fa75Efb427Cd31Dad59a1",20],
// ["0xFB3Adda5454d23f5A60Ee12cAF75891e9712f9D3",1],
// ["0x750F5D8eF17dB9fFeEbF4ae3b96e135f7852CCFB",1],
// ["0x1D3F654700F20b74Fdf15ed6D53e32Ce097cde91",2],
// ["0x3262B60996Aeb5c25dd1aA0Ff3EE8D04f46B3f2a",3],
// ["0x9a1661000a430Ca2B594DE69Bf369849218D316A",1],
// ["0x63bF15bcdfBE6B3bb715D6134C68Ce2583d23b7d",1],
// ["0x01dA40E26fC5C8716b9b742A6F34C5394FF22Ce7",1],
// ["0x9a1661000a430Ca2B594DE69Bf369849218D316A",1],
// ["0x661DE46cd60F552aa67F60Cfa7635894Ac8B29a3",2],
// ["0x708FcBCbbB534Ed5f90F7cd3aB06503E8791b56e",2],
// ["0xEc00CFc52C2190D27F42e75410335f037d255478",11],
// ["0xf14128bd3384b032124F6aEe913F14bccbe53aA6",10],
// ["0x442B2c598e976cC2dD62B843e251942BC91Dcf73",7],
// ["0x442B2c598e976cC2dD62B843e251942BC91Dcf73",1],
// ["0x442B2c598e976cC2dD62B843e251942BC91Dcf73",1],
// ["0xC0dEFc30E6b88a11991f5e53c51Adcd5df527B20",1],
// ["0x7d5A919A84238aeD17eF402092E133a40A22df39",3],
// ["0xc6794d59619660B748c6D40EE4949a143212C3E9",16],
// ["0x7d5A919A84238aeD17eF402092E133a40A22df39",9],
// ["0xa2F11579ac4D453eC0Cb919319d08eEDD636122B",2],
// ["0x51cd0f0a2A9c7F3Cf47D12d37E43f4Bfc1304968",1],
// ["0x8a037A53773621D6daA80222660A0c7779F2A35A",1],
// ["0x8487F3BB028b340C06eBF5Aa10f3fBD7dAEecBa8",6],
// ["0x24D59bA8700B69418E2c3fd3d1C98b1F1Aa464f3",10],
// ["0x8a037A53773621D6daA80222660A0c7779F2A35A",1],
// ["0xd659D262dc4b895c115F9928d6f62a11A5064006",1],
// ["0x976dFd80F6904f80FEdf8fe60D3590126EF1507f",8],
// ["0x87B98bDE13160965dB66bb576d18d4D485626256",1],
// ["0xd46e0af401F03DcE7Ef38A684564725F656d36ac",1],
// ["0x0ED2a3CdD0Ab5fdBA13Cc388fb0201Ba107Ea31f",3],
// ["0x5A72E69A6b2ea8cC91E6e8d772C2D8617002f5ED",3],
// ["0xfcd38b930aF5f0D44E9d7c18B211BeFe76bE23CB",2],
// ["0x45D456d1DF28BcD326aD656ff05344c00Ef8d44b",1],
// ["0xe9E892d5d061d168bbe101ace95aA81b4F3cF81f",16],
// ["0xEBCf5989143DF4c28d10023E1d9Aa14336e92B8f",1],
// ["0xf3C605A5cAC8A289d32a6Bdd474c7D74Dcac9C9d",1],
// ["0x6E7666cbDc1F1379dB894b9fB07a7e7f16618E86",1],
// ["0x6E7666cbDc1F1379dB894b9fB07a7e7f16618E86",1],
// ["0x6E7666cbDc1F1379dB894b9fB07a7e7f16618E86",1],
// ["0x6E7666cbDc1F1379dB894b9fB07a7e7f16618E86",1],
// ["0xF6FC4641B0Bb992fF71f847F265A09aBc9897955",4],
// ["0xCE05751e1886676C110F9c6765d94E600E73FFd2",2],
// ["0x854E6511197fb35D7965e016d8c250E432b6CF45",1],
// ["0x810e1E9483b78755DF5221204DfB13Ac4cc4A875",1],
// ["0x66986A38C4B55c83d08870ab7f8eA716a7467849",1],
// ["0x560245DA16F6FE04990D637af2351b02d779f9cC",1],
// ["0x03b919f1475DEF8F141BC4A031DA520B0E42F078",2],
// ["0x8091338ce4517699bbb488AD6e3C18AD6585eb8C",1],
// ["0xFA9f467b8DCfbe058DEF198d1f8C5B6f8C22bEAC",1],
// ["0xDF782632E5141B5cb78a816da2640A9909B195a7",1],
// ["0x4dfD3281beB24870fA4054B3Ba1b0caeE76b5D1f",1],
// ["0x2C189D819fcebBB82191a650e33169297A7C2F70",1],
// ["0x2C189D819fcebBB82191a650e33169297A7C2F70",1],
// ["0x2C189D819fcebBB82191a650e33169297A7C2F70",1],
// ["0xf49F4C8A3CBF93a782A892a7491aA2ea5ACCc814",1],
// ["0x2C189D819fcebBB82191a650e33169297A7C2F70",1],
// ["0x2C189D819fcebBB82191a650e33169297A7C2F70",1],
// ["0x9273b507f222aa469496e568B31Da057835Fbc9b",1],
// ["0x1DBa417D93fBB0EDAA9D5349191b46Df4df3504A",2],
// ["0x9273b507f222aa469496e568B31Da057835Fbc9b",1],
// ["0x9dC04bC4B1900A6349391B29E00cc164aefA70b6",3],
// ["0xE89EEE947DAFbD5aAE0D302CC8734F2e37c5139b",1],
// ["0xD2ed31b422F161454dE328689ABE67d6b2984770",2],
// ["0x61d781A2ea743532c67feb59380162269247970b",3],
// ["0xb17f7D347c2D64b6f877940260839daaff02c87d",5],
// ["0x80e69a5bCf0eAb9DcA7664a4525Bf1896A1a684D",1],
// ["0x41337A06e1E6D3F3f17b3E3db3b2a3603652F90c",1],
// ["0xe0bec2a60F5E14dc808bA1CA3965e13cf3db4804",1],
// ["0x197e48eb0eEa244776384515fCaEdeE124686fcB",1],
// ["0xEB44f17Ea4FAaa4B922ABf8D54efe2C204968E40",1],
// ["0x88ecbcc049B7D047b2D3f01e3470Fc2c6FdDa1fC",1],
// ["0xB2Cba3fD10cFc74550E17e316F89B8e71DBDb2A3",1],
// ["0xF994800D97870A98624347a61FF6180BA4e91B93",1],
// ["0x0873bd17CaD4dd06b1e78A3F300C59ccBBFff4BF",2],
// ["0x9E5926466dA501EcE0aFa724C38E42d0899701b2",1],
// ["0x5882c75145a0CA86461E484dD3dC91172266DD54",3],
// ["0x487fbD29d0aE4759d9EbE944f211Cc3D87658D86",1],
// ["0xBcFbdaA09750bBF3f25868a36a659C1A348C6bdb",1],
// ["0xFA9f467b8DCfbe058DEF198d1f8C5B6f8C22bEAC",1],
// ["0xFA9f467b8DCfbe058DEF198d1f8C5B6f8C22bEAC",1],
// ["0xFA9f467b8DCfbe058DEF198d1f8C5B6f8C22bEAC",1],
// ["0xFA9f467b8DCfbe058DEF198d1f8C5B6f8C22bEAC",1],
// ["0x0Ea3C5e8e543656615FaeBf9160c9138647c3B78",2],
// ["0x6168CF7e30CED0e30734AF52404a2D942322700d",1],
// ["0x3a7d15137688a2286E2b27a4C64027eF138B4A74",1],
// ["0x079D4bE5Bf24E954ab1786747095315f37cD5E52",1],
// ["0xEBC04D33355eea0a262347D75cf69b47Ae9D6bfE",1],
// ["0xC62f891BDfE84d7E8CC8c04c7AA2825E330F1Cdd",1],
// ["0x98385B6514e762dF366884e580496949126dB38a",1],
// ["0x560245DA16F6FE04990D637af2351b02d779f9cC",1],
// ["0x560245DA16F6FE04990D637af2351b02d779f9cC",1],
// ["0x560245DA16F6FE04990D637af2351b02d779f9cC",1],
// ["0x86377c6Bde3eAaA0a66bb3f8C7B489b3d20C4fA8",2],
// ["0x1604583B6791b4e055Af477E0aBe0e287F073E6b",1],
// ["0x314186a7a38B3f4b01C255e8A20F195BeFADfb0d",1],
// ["0x33e9A14c927bAD3460Ff2bfF4f749c886F5b03c3",1],
// ["0x0b0629938DB616E9C534d9eA9D648d24D195e93E",3],
// ["0x9b2FEaB68A09769dc1693CfFb4FeAff09A942065",1],
// ["0xeeb6F9d75375443DE32fC0293B0fCa0b31fd6756",4],
// ["0x01957bAAC804609edE0E9284cb7428a93d9c0C53",3],
// ["0x2aA4Bd7d214f5921E80F3696e4A0D9Bd57a3EE86",1],
// ["0x8A953992be8E7C77B05aF737030dBEF803406Af9",1],
// ["0x2E32b0CE13BAe7bbD448C4E02775C23Ade5fC728",1],
// ["0xe0bec2a60F5E14dc808bA1CA3965e13cf3db4804",1],
// ["0x3A0D87fD5e13925542B798E1F3D3473199255Cd7",1],
// ["0x1F7Bda8C3A86E4994147ef4004f1516EAE60Af4e",6],
// ["0x6e778cf887c9eaDc39C48f318734f0FBf8f79EDe",2],
// ["0x29Ce5103D7dEC2216E498dF8D4a2691913644a2A",1],
// ["0xab8120D1Ad870Eed202959A3537FC75b35c2155A",1],
// ["0x3Ad52abb3f409E776585B729fA9DdfaD5b94e9C1",1],
// ["0x38587426ab6295E32Dec9DDf7E43aa721fF94F72",1],
// ["0x3A04b89840353DEaa09900e4D372bd5D56CaeaD0",2],
// ["0xbABDf07A2B587ea551cD167021626c28ea3ad40A",1],
// ["0xbABDf07A2B587ea551cD167021626c28ea3ad40A",1],
// ["0xbABDf07A2B587ea551cD167021626c28ea3ad40A",1],
// ["0xbABDf07A2B587ea551cD167021626c28ea3ad40A",1],
// ["0x207718B5B8caA6d18D03d67583b280aFb6508D26",1],
];


exports.data = data;