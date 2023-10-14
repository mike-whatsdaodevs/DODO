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
// ["0x063D65113746Eaf52ad627b7e0AE2CDE0bBa5bc2",10],
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
// ["0xd659D262dc4b895c115F9928d6f62a11A5064006",3],
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
// ["0x2320C8b3C39a03C9E0611673F8062B0A475aEEA3",1],
// ["0xD61563434b71243D3c51443A707545db1B314F20",2],
// ["0x24827C533E1EDb8FAE2C0B2f8B931aF6499a3f0E",1],
// ["0x849f2317a3B90ad7a5E406646fAADd7FA55495e0",1],
// ["0x5E91729e9ee2983f7274935315318cE71195A10b",4],
// ["0xd17dA166D25261F0854D0ae1A24680271f43e00a",1],
// ["0xa26165DaCb9A1C52fff83a9211a8963dF1b7f885",1],
// ["0x6ADc21647B24b239F05b381D0Ad945a93AA28d28",1],
// ["0x0A01F7FC981E875Dfdd9D8acBE89C09eEa515786",1],
// ["0x759D7b2d5b31A86e4c3CBe2D4aE4b8EE718d8B44",2],
// ["0xB91d1c61e15286f6F5344ba6E64aeCc2bB84cA2d",1],
// ["0xb45780E03654C993613Aa0e41d405195384601ad",1],
// ["0x802f05212d1Cb2051FF8438E8B9C3915fFF8F21b",4],
// ["0x8aa26b8a840E074Af7d629751a939C3D6E6F8D82",5],
// ["0xB2aF5D10db8258049CF56836fc4376F5f3681612",2],
// ["0x91aA115f61050A7E97b97984112317674A6A52d1",1],
// ["0xc018931fcc3861383E0Eaff5F1810aeCA36F7FA6",1],
// ["0x4Db53CF2927C708dEEFBA4EE165229380999C458",1],
// ["0x0ad71d605029ca3880D444048F302C617d77775e",1],
// ["0x754C29AecD9F98eE6c2b623d54f2F0ed5AFc63C5",1],
// ["0xcCCf3a0d602387819acD6AFEeb459b91b5EfEc89",1],
// ["0xE6555d7Aa40c5BD9BcDe73c7e6E6eAFD0edE3097",1],
// ["0xE6555d7Aa40c5BD9BcDe73c7e6E6eAFD0edE3097",1],
// ["0xe59872BfF1b76048E489793BD0DD1c5ECC92f7a8",1],
// ["0xDC69F60eeCE3bDBfeb0461894bc58D43cA0ecAB5",1],
// ["0x5231345adD65f70Fd66d3a77793496EC72B622Db",1],
// ["0x4c8FF456Ba66A9e5C7C24b09f6cEb7c484a7Fec8",1],
// ["0xc4e119A0E02BD7Fa5F204763dA5C9A7ca874532C",1],
// ["0xe4623633C0D5372FA158F86b6236343c372fF16A",1],
// ["0x027F41635F8297434AA2c487c95358b0176B71e1",1],
// ["0x665fD8F242377e2438A8B34E1A3edb67D4E16bD5",2],
// ["0x6c38b80213EA2B856B78545A6aDA0DCc03132730",1],
// ["0x0ea6E057684A5492dB7881AFD60eE3d12e5bC004",1],
// ["0x0ea6E057684A5492dB7881AFD60eE3d12e5bC004",1],
// ["0x07CC712BD0Ec58D9Db7Aca4Fe2A446fF5b998a18",1],
// ["0x2Fa39A958a79770a2058D524686E42F779B704Ae",1],
// ["0xE53428B0dcDb0D9D57Cd3dA023C79dA6a50aC47E",1],
// ["0x5ff1Bf79e269a715F33C4Cd4f2F1d4BB5BD258F9",1],
// ["0x43327299a81580E81AB13CB4B89c2BB96049c0C8",1],
// ["0xd09884b1D6F63D7D2C31B11D8a17FEdB739c2b99",2],
// ["0x8ddd43267e0c96c78128b4a73577068E313691Bf",1],
// ["0xb351F503fE0561e7d8F7270aece757c3d51b8FC2",12],
// ["0x8894EA549363AA75bB20572D9E707a0b3b2994f6",4],
// ["0x176fDE2c9138b13Cbfe7a319E2C90b583e2f8d23",1],
// ["0x176fDE2c9138b13Cbfe7a319E2C90b583e2f8d23",1],
// ["0xBb0366CD7411d0C6F7ee83C3520C01cd434992d1",1],
// ["0xbD879cd635659dEdf79d41732e292ACADA04517a",1],
// ["0x4E42a0FaA6908C7302Ce4Cf812a8a47d017eFF72",1],
// ["0xa33861C12bEB105A5D1195617991400e66A63f52",8],
// ["0xc77A04bC85a84dB5EF6010B10142cEd58C1DA3Dd",1],
// ["0x7e558CDEcc5AbF57Bc7225D69261356bd7d0f233",1],
// ["0x7e558CDEcc5AbF57Bc7225D69261356bd7d0f233",1],
// ["0x7e558CDEcc5AbF57Bc7225D69261356bd7d0f233",1],
// ["0xcCB601f99e82F5b93AD24030F8ea7a098fF5B91C",3],
// ["0x7C7101a63ba6aAB444492BE4f6090765677EB742",1],
// ["0x7C7101a63ba6aAB444492BE4f6090765677EB742",1],
// ["0x13ca635B0c89E1d7ed6c53b124d82b64fEb4619e",2],
// ["0x95EBdE6a7C0A91699EAC972C8cD3284F45d5e1e5",4],
// ["0xe8392098021db55Ca87a893Fd46AC2602EE6E0CF",1],
// ["0xb3B3cBc2792b5530EaC1335242B50FeCe30f60f7",1],
// ["0x92BC81aE5D8f5AE0F568AC3868069ac9f21FaC94",1],
// ["0xDa7582BCFE5CaEFeF432B160963667f272C9A9aA",1],
// ["0xC38F09bF1Fac90d422593038be083eB4806f7336",4],
// ["0xBe7D221937ECb018EfAac680310FDE1EB9B05Fc1",5],
// ["0x9Ffd0A4a9605b0c5763110a5782da090e548a9d5",1],
// ["0x2a5a8Ce74465933f8590a3c6eef02b4956764aB9",1],
// ["0x0d7904AD5dC13C40EaB35Ff2397AbC5a9cAC554a",1],
// ["0x4964CCF76F812744781F29eB4B877B82595D90f0",1],
// ["0x9dF5B5d8F2a73B0a55E264F04bfC52E555E1beBB",1],
// ["0x9eB3DB92C1AC5035C05E1f48334bcc0D98D6199e",1],
// ["0x890201dc9e512d4f796A64749E250B34F33a29B2",1],
// ["0xb0f9225312f1131858609Bd4c014A61DEa519586",2],
// ["0xdBb2B358623279a071465a1a4957a09f8ac15F31",1],
// ["0xdAD85c48Feef5f80Aa00fc286440a80dE84a2406",1],
// ["0xF6b489447806bB807b3E5a69c187997f1829Da27",1],
// ["0x4C17C3058E1B2ba16bC6ec9BFD37DA07A7E7b495",2],
// ["0xB560dDEfdef726ac4C3258f335aAFc37a27C6044",4],
// ["0x1f8277b182d190213e13F3fD3D86f63c806Bb713",1],
// ["0x9dC04bC4B1900A6349391B29E00cc164aefA70b6",3],
// ["0x9eB3DB92C1AC5035C05E1f48334bcc0D98D6199e",1],
// ["0x72A8897b5B557d5a1041AAa3739C13Ec50b7AC1c",1],
// ["0xdBcff52dA8871e477cd01ADA2bd4e922998A65E3",1],
// ["0x29be8fd9184e9b57FbDFA5e23EAB3C35778FD657",1],
// ["0xa74C0c3A0985456b1DED6e63f953Bc2DDcF01568",1],
// ["0x76DEe299DC175D8AEfA7D68A755DE4C1455FE63F",2],
// ["0xbf83178850D8FD5e345D60BA3f86C1A2Deda4062",1],
// ["0x46e6606fEB998FB8316DD152277152420DDf46D0",1],
// ["0x5956a9bC0292C06263fed7adbC05A233908e5170",1],
// ["0x99f64a002F4cb46d78D212d2B8b070C1A3d2A771",1],
// ["0x7808886928aB557AF100fdceef8754536f6a3421",1],
// ["0x7FF86f767d6E32d9B05b22D346267E3dF58f85d8",5],
// ["0xf882DAb30917Bd7F50B710df90a27c900a792Eb5",1],
// ["0x5BD30E35d294f8CC6276C6c274C87A5DdE1C3484",1],
// ["0x9c3784e75A8Fe4928ec17Ae9515cf300D7502e4F",1],
// ["0x0a9eA6F9ddCbECC7BB4b5C61F348Fb3dFb93ECAB",4],
// ["0xA72C888Bc3006B68Ea32D412F15bE6f9eB00f54C",1],
// ["0x61ECBAf5E899E8357Ee8C378b14b1198B9A646E5",1],
// ["0xf63f34471DA1c26Aa2320ab805A0bF1b767477f0",1],
// ["0xa46927EC46Fe8F772cbeA3FC3e6b8737cC9F936F",1],
// ["0xA5c3E8F34d8964C6754e8ae746DCbE5694AFAc0B",2],
// ["0xF5cbAde56a604Db793807e579864E9dA33f9FFd8",5],
// ["0xAE55607cA289d96fC01FFDD5Cd8A7eD041382C5e",1],
// ["0xB77066728FEc8b92A5591Fd1B85DAF85b16eF743",1],
// ["0x02Fe2D12e45946300fcc6fCb504A4062B4f51d80",1],
// ["0xb9AB733De194722A0886D731CFeBeD83F368c520",1],
// ["0x3762AE2e742120d19EF7E21AC2938c2A56FaD6c2",1],
// ["0xd6B8bb70264D41Cb5C01efabB386af37a063b54f",5],
// ["0x94E8d9658EF0d73c305A657cE2bA2EA0384A4C50",4],
// ["0x279a23E494371ad325425E85765185eD2583C4A8",6],
// ["0xb683546ed9F60F02e1Fe5022e470EC33af78aeBA",9],
// ["0xB18e248db9ECBdE01D14771368B33b4BDA8757Db",2],
// ["0x37B58F4b7ebFDd2d3D1edA9E84D39783E262E60f",1],
// ["0xbA3959Ae6708b0D15df815E42d4ccD275129CD18",1],
// ["0x3d395C7f7DEb15508D2693cd1440359BBFaE5a18",2],
// ["0x98C66bA66056F6Cf2897540983Ae8295Eb9Ea89c",1],
// ["0xbb1Bb46C9Fb2026BAeb72eaE0545ece2708db99d",1],
// ["0xF7C982853fF7beD66B73d6E9BB82dc0B66D15DbA",1],
// ["0xB2dfE5c28BeA636a292449771232ec8f00Df0d3D",1],
// ["0xD2c7367059Dd687Bd0F81028D90f60034aDF7D4c",1],
// ["0x436ba775A317d88d762388D5151d041d9A0130d5",1],
// ["0xA55aA15cAd2988f0661F0833744094a58D0bEA7C",1],
// ["0xAD8414aAb9A497678088d9A76Eadcec1a07B82c3",2],
// ["0x8237C13145bf1E6EBe45A07b0e9A61EB59Ef65b2",1],
// ["0x36089902F380b7176E2F6B5353aDc66878423876",1],
// ["0x15cb01eF72f2DaAEFD5834be049cbed48F8bcA26",1],
// ["0xCd08e996d8dCB34df2aFa1b64F6F15B236135E9d",3],
// ["0x61077B88DB241a20DD0f97C687562bb9F6F57C18",1],
// ["0x25c409d78F410b46d24530DcAd8391C6Cd7eFB95",4],
// ["0x3bc654D84e6ba2aD5E96815a27E2b70195bfC81e",5],
// ["0xa7a0A77d462BAE49726E19BA794BaC36aFa47b55",1],
// ["0x5c15bAF2856f0A679f09F7c27463A3AF8023a2Ba",1],
// ["0xf5c2A6cb32249b434702FC1C704d64876aD0e77A",1],
// ["0x60732c48f8929B65AC9bD6142F9692223722c03c",1],
// ["0x8EE6126b61770bcd0c7AB0B7698c5EeB03cA6ce6",1],
// ["0x25A0a6bfC2BFe10B4D6B21403834b5d8256bbf3f",1],
// ["0x36F60A8282b20C41D682dA6bDcb30aed3Ae6F17d",1],
// ["0x4850cd64C77b9C3277c3F011f0298cBBD98171eF",1],
// ["0xc5743A2a1e6eC163BF7eD087afbd4e6B65bEda5b",1],
// ["0x7a89838e2B1d0496512e1664C3D7c1C0437Dc99D",1],
// ["0x4941718976FB31AA9900bc212AB7995450c21C31",1],
// ["0x5c06989c81Fb420A5E9F8BB80B46B93CE90039B8",1],
// ["0x54E303c3579e35828297d97258129A47Ec1525EF",1],
// ["0x7bb3b57e86d3A43B5e98e820D5437e8E1f64c8F3",1],
// ["0x1DBa417D93fBB0EDAA9D5349191b46Df4df3504A",1],
// ["0x4248e157e671486732d916366d6312240cA6d0Bf",1],
// ["0x8D653D662B166B3f914090d4b242C89668bC3C3b",1],
// ["0xFbE0cD2312c3E47aca764EB7641FCCAAdE4De6c2",1],
// ["0x1f66871bE3424ad8366871350f9f50a075EfF8E3",4],
// ["0xc551F10144b11Dc8d4975f62A92d0D1c890cA456",1],
// ["0x0e0F3316F260FE5D1fFdA7C7c52127853c9B34f4",1],
// ["0x643696338D48b5262b54f1624bFAD768718493E7",1],
// ["0x0E926bc612832A58386D3c39a6e6d16aeEAc5A39",1],
// ["0xD960580d3683BE3E07356E984BE1fa98C6E43a5c",1],
// ["0x59023bCd3016918A68D5fAd66A598dE25dad0A23",1],
// ["0x210790e3E0d62ffc5215c5605Bcbcb90b46C6dEb",1],
// ["0x4F84aD866646E392C38Ce3365Cfd653107Aa0735",1],
// ["0x4391764EFb003C94692C7734ac284e584262a668",1],
// ["0x3bc654D84e6ba2aD5E96815a27E2b70195bfC81e",1],
// ["0xf86f2607A8Af02cff4764a9F7B1cEAF74C16F89E",1],
// ["0x32C82E38a469967FfC0ECd6F2DC03A61CEA8e47F",1],
// ["0x3bc654D84e6ba2aD5E96815a27E2b70195bfC81e",1],
// ["0x591a043a1a26C1Fd01cA0a93693f1A828A7a9ce1",2],
// ["0x6C4aaAa88BDba1329258fd3f9D75d97BBFCe971e",1],
// ["0x066BEe483c7ADDBc1972C2e2fFB16a06E5589012",1],
// ["0x1453Dc9A234c9dF0eF9c573Df1cad74e43a0F29B",1],
// ["0xA9c96122Bf6ac7838D258b1E33FB06481182dc3c",1],
// ["0x0E0789506F07969C2224faE26dE8F4aED8B4864D",1],
// ["0xD09967D5239980b47D97aC24670A4db70bf9E88E",1],
// ["0xc9Fd718c3F48574bf2fA5dba9b6Ba4D325edca0D",2],
// ["0x7Bb5EAdc484a060bEb2B1f5560167F969166E8fC",2],
// ["0xC8104A5c477c0bC7BEF1DC9f50a8060b6F31eaE9",1],
// ["0x59023bCd3016918A68D5fAd66A598dE25dad0A23",1],
// ["0xc5743A2a1e6eC163BF7eD087afbd4e6B65bEda5b",1],
// ["0x091099F3b751Fd294efC4dFd98910B2146376242",1],
// ["0xfc4d4E15Bf9674132B529a6E596D525775BC873D",1],
// ["0x3141ff48f51ae3A4B85A0515d0ccE522dA19A6DD",1],
// ["0x76717c34185b4f8da89eEf6cbF9cCC803aC26235",1],
// ["0xB542CD4ccB82AAae94ED9a56F6b51F34bbF7db11",1],
// ["0x94E6a211031A0854a26111adca5012283bb4A020",1],
// ["0x8c57BE472D02a06b40ef718CAC6034A3bb7166F2",1],
// ["0x289052ab5AB7F935f4c8e0d5349443Ffb6358972",1],
// ["0x78b484F49Cc41f8be2d7850F1A1ca43b55be9828",1],
// ["0x947aFc127C0aE663C034EE27C0D5d4283d9Ef1B5",1],
// ["0x3bc654D84e6ba2aD5E96815a27E2b70195bfC81e",1],
// ["0x2f0C75494a729f81F060FDE6D040Fb5D1ca8a440",1],
// ["0x64AE2808d8C78102C660710Ed6e3195121A61a93",2],
// ["0x09C253198091b33f0BB93CEEbe5EFb20238f7312",2],
// ["0xD09967D5239980b47D97aC24670A4db70bf9E88E",1],
// ["0x54E303c3579e35828297d97258129A47Ec1525EF",1],
// ["0x0c2109C82ED07EA6912f37E1128a796E3c63A70f",1],
// ["0x5ca197b0b6280d162f76DCE8aCa3091429364e2B",1],
// ["0x0ECB89C121b759b6284d9e225364c76bfa1AEabB",1],
// ["0xC1A1df715d5A0Ab5dAad5281183122F1c723ead0",1],
// ["0x069Ce9919e278C6b945bf8f30cB47FaF2c77E557",1],
// ["0x7918f98287A5B5B4391cf14d47D161b3251eB3AE",1],
// ["0xCf304d547A1EE0CC6F77Afe8FD6105741152e03a",1],
// ["0x3E1B2520b86EA16458EA29cD6271539219134eC6",1],
// ["0x2f5270bfEF42015A652CEC7b698b4cC533Fb5904",6],
// ["0xB2dfE5c28BeA636a292449771232ec8f00Df0d3D",1],
// ["0x70bc343B199d5D3E017E10c647D97b893627Cf7c",2],
// ["0xD9F86Ba753649Bd0ad7E3215EDE7ECC9Ea7315F5",1],
// ["0x6ac8DD92f23FEb6E2d05f9C7D601953a857Bf566",3],
// ["0x59023bCd3016918A68D5fAd66A598dE25dad0A23",1],
// ["0x5630A71FFFF05b553E2C55f566903a9c1C2e2836",1],
// ["0xD8e463AC3A839A336756F4ad82128c67708CF556",2],
// ["0xefca0459E3aC403F4911B53965Da895889bb4554",1],
// ["0xC2579b20E9F08572F81A27197EAD3b86a7a4f8CD",5],
// ["0x8Ee20d9671FAd8B077D93cA67443E76903c20499",1],
// ["0xcc1128c66f84d571cb34858212D8ea57619cea3e",1],
// ["0xE1de3A86813C57311964A542927B7049f18678f0",1],
// ["0x036b745b90B2693f92a001466BfC8cC4fc1E0827",1],
// ["0x6ac8DD92f23FEb6E2d05f9C7D601953a857Bf566",2],
// ["0x9d9277fe681F86a58da2E42e39814b6B30543974",1],
// ["0x958Fef56fF2E6B03b8fFE13Afab2B18f88782fFe",1],
// ["0x4E584B7c3c4A3E8AE3C44d2e0de60eb04B05FC7C",2],
// ["0xCA672F92d00FeE6D12Dd0Eb9c669A278b19e23a2",2],
// ["0x5D72697Dd13974aa1353739d7996AeC4f7aBA005",1],
// ["0x59990eAD69863C597c4E1A6111d3D768Eb9D96f1",1],
// ["0xcE1847bF60c0a65169DBa8a22bd8492e276114F8",1],
// ["0x569e0BD1F4560b452e1906f0BB839FC003F70Ab6",2],
// ["0xCF611F17903040862c73A379D11c5a17bDD580FE",1],
// ["0xAD8414aAb9A497678088d9A76Eadcec1a07B82c3",2],
// ["0x9b2FEaB68A09769dc1693CfFb4FeAff09A942065",1],
// ["0x54dbe0C011D191e76d20362DDF0F474D3A907951",1],
// ["0x51C424eED6c630dCc3F422232CB6128d72f67031",1],
// ["0x242134B4F5C85204D33b5C67F3119bA0ce59992d",2],
// ["0xB2dfE5c28BeA636a292449771232ec8f00Df0d3D",1],
// ["0x34b52F9d0C3375Ab087753A6707Cf2f1727650B4",1],
// ["0x98C66bA66056F6Cf2897540983Ae8295Eb9Ea89c",1],
// ["0x527f22e0eAC2aAd80BB9e7c95795166d4947FD9D",1],
// ["0x0e5f4d839b9C5b4A4247497514fC7264EF16dc11",1],
// ["0xD09967D5239980b47D97aC24670A4db70bf9E88E",1],
// ["0xd1222616834c9face232C26D70568b37cB60A513",1],
// ["0xA55aA15cAd2988f0661F0833744094a58D0bEA7C",1],
// ["0xD2A8C91F8500FF448c2f232d317187E6f1d22993",1],
// ["0x512A3003c328a1E14f55F8BB05b8305353F17c40",1],
// ["0x92b68De98140662609049A055A42Cf0C87be1Ec2",2],
// ["0xEd3321662BDd1ffe6d318B71Fe1DE8a7d6aDB2E5",2],
// ["0x295f1b268B7ac8131242fF755a2D7BF7E9068Ee1",1],
// ["0xC1A1df715d5A0Ab5dAad5281183122F1c723ead0",1],
// ["0xAa71a30B8259C768BDE835aBeECB141F656E9Dc6",1],
// ["0xAe5b6f66CaD2143d95bEEF2033eD397d349C664d",1],
// ["0xA0778a04E6d32C13f11BC391Ea170A0A2a80133D",1],
// ["0x2b63AF5a2B88c2884a9A0f50389e38C630af5FE1",1],
// ["0x958Fef56fF2E6B03b8fFE13Afab2B18f88782fFe",1],
// ["0x3bc654D84e6ba2aD5E96815a27E2b70195bfC81e",2],
// ["0x66D1A55519360a11198d68a1F3caa3488dbcA2a6",1],
// ["0x31bd50D8208DA6Da450216140A2F381E1d048671",1],
// ["0x76493b0FB64B2BCCa51937676dc84B1B51e2FdC9",1],
// ["0x77e7351200DbdB00E616a5c0aE7b0bb5D23452C2",2],
// ["0xeeaf9b2cB8459A8a329d411BcDb1a2CCCd32057b",2],
// ["0x0A01F7FC981E875Dfdd9D8acBE89C09eEa515786",2],
// ["0xc5743A2a1e6eC163BF7eD087afbd4e6B65bEda5b",1],
// ["0xffe6F471907b8D29051539CEfC84a9df2861CCE7",3],
// ["0x2C81F48f28a1a10B6f10621036d4538f87Cf6586",1],
// ["0x958Fef56fF2E6B03b8fFE13Afab2B18f88782fFe",1],
// ["0x5130A0DF45F31eA6db42078a118D64f26C84542B",1],
// ["0xD9F86Ba753649Bd0ad7E3215EDE7ECC9Ea7315F5",1],
// ["0x0A122C3Bc92FC98C09bC468E7A734f6367DF5f48",1],
// ["0x7691fD028C06923285bFa9aFBc555b5bb1c5DC08",1],
// ["0x0E926bc612832A58386D3c39a6e6d16aeEAc5A39",1],
// ["0x34fE8E3b8937C0f3fA9f45bcBB4105F32107fd3f",1],
// ["0x9651c7EBe7A5E73B86A73478E401478f9dD85A9C",1],
// ["0x1058e332B7B6454e0e6511492f5F59E961eA0602",1],
// ["0x8258FA52778dAc75af4b2D54F0d77853C69D6A7C",2],
// ["0x2eF6C2Ec3c7A4E22A43fFa7881142a3a9669b182",1],
// ["0xa1545ca664306765a17F994EC853006F45002879",5],
// ["0xde3e2991fE3af2a54169485D4566D97B2C30Eb99",1],
// ["0xA12a9D65b5859ac5ffD9E85F0Ffb166F91c1fef0",1],
// ["0x4e5B295713FC18b84E8d54b46eB87Cb997b52A4f",1],
// ["0xB08FcF968fD938ca39F8a9AD9b83b52311638F39",2],
// ["0xAD8414aAb9A497678088d9A76Eadcec1a07B82c3",2],
// ["0xdC8E2f52196b1A309871957cBd464Ffc91f6c995",1],
// ["0x5B1E3b98b4a10c8d9968541973530dc274AB2327",1],
// ["0x54E303c3579e35828297d97258129A47Ec1525EF",1],
// ["0xd8dc670846ad2469C2f2DB53a9540Cd0aABF17Cf",1],
// ["0xfC09fB2A8a51165B1a1d329973337F3930de1C6B",5],
// ["0x69c56f7Afb25fFB713dF40D69EB1fCF8E78e683b",1],
// ["0x28CDC9C64CfC4049c098C83ea1da99bf01b12092",1],
// ["0x02E91401b7E9F2FDF26807DFBCda2E47Ff852f20",1],
// ["0x569CD63Bc75d6bB7D9e642EeD49B0Dc509921D6d",1],
// ["0x21b2F36385fCb5E6Fd3BfAC90680FFDd81262b06",1],
// ["0xAe5b6f66CaD2143d95bEEF2033eD397d349C664d",1],
// ["0x60d8D6c554098CffD756cC51aaD20efec36CDb94",1],
// ["0x1DBa417D93fBB0EDAA9D5349191b46Df4df3504A",2],
// ["0x10757D1207aafD989742F024f80c8B9Eb69c8Ee4",3],
// ["0xFF893079A025130A061042627A447aF94F87e331",1],
// ["0xb87CB655A7cBc9c7eCa26aD5589bCFF907FB7b57",1],
// ["0x0e5f4d839b9C5b4A4247497514fC7264EF16dc11",1],
// ["0x7Bb5EAdc484a060bEb2B1f5560167F969166E8fC",2],
// ["0x7918f98287A5B5B4391cf14d47D161b3251eB3AE",1],
// ["0x98b8B2E11EA3C610eF3097E71d2A70CFA0A2dE08",2],
// ["0x738bB8123DF1678537e126C891B192B90bD2C049",1],
// ["0x1DBa417D93fBB0EDAA9D5349191b46Df4df3504A",1],
// ["0xD7F0DEEe7aAd265B9D006934F22f4542Ec3e33F0",1],
// ["0x7A99c9e0ec1c6F3155c575B2eF8995C5e5eb3f54",1],
// ["0x8a684B2AABbbeB27363B0617934700Ab2345CFB8",1],
// ["0x637752369d747aaA18E3ba10B6553d6d4e9ADd0B",1],
// ["0xfe04B9aA86e331fa105Cd475BA7a15847Ac42cF9",1],
// ["0x54E303c3579e35828297d97258129A47Ec1525EF",1],
// ["0xf8dd7321C4B70eC3f110932551491846643b7528",1],
// ["0x7918f98287A5B5B4391cf14d47D161b3251eB3AE",2],
// ["0xc1Eec49e60305dec8cF0FeC381030A66331697C1",1],
// ["0x673B5963d9b65eee4fd57Fc04cC0DA5Dbd1109a0",1],
// ["0x9dEDcB4BE249Dd144Da6718bFCD89862830e56c1",1],
// ["0xF679478D17A0945e367A51823c95C9Ffe7527462",1],
// ["0xeC812519A83CCB2Ea78897d3b0Ed268156D9Ad92",1],
// ["0xCF611F17903040862c73A379D11c5a17bDD580FE",1],
// ["0x190cf6a6652d47bDFbcDc63d10326e07396941ac",2],
// ["0xCF611F17903040862c73A379D11c5a17bDD580FE",1],
// ["0x5B1E3b98b4a10c8d9968541973530dc274AB2327",1],
// ["0xa2dbb771748610bC1Fada5E112431fA399002603",1],
// ["0x79Dd641F6922d9dab72bE7bDc77BE9bf42C0bCFD",1],
// ["0x7Bb5EAdc484a060bEb2B1f5560167F969166E8fC",2],
// ["0xA55aA15cAd2988f0661F0833744094a58D0bEA7C",1],
// ["0x75989FA8050F0Aa33341498A5B2e41ba6c224cf8",1],
// ["0x96E3DFEc4617CC3c9053F7354f1718FD8cFf2252",2],
// ["0x814ecFE729155235B3e69fbA809eEcdbDB2dC7B3",1],
// ["0xd8E215FE66FA812Ad2ebD455db58Da4e9FD2667d",1],
// ["0x3C808f0e82432AAC68aa611cc5066c369Ce23E53",2],
// ["0xb27592983E2680832603a98d0213c9DC31D70990",3],
// ["0xE36D2FBc7ce801542790768106Babbcfe0f758a8",1],
// ["0xc9F1854A320500EC5ae67FD1eE3d5aA8c5e8394A",1],
// ["0x686A0Aa1F5DF184333062fbe4ED12AfFb3209885",1],
// ["0xc3d8281F2D688E0CA0b927aF28401F564eB73E76",1],
// ["0xFF893079A025130A061042627A447aF94F87e331",1],
// ["0x5B1E3b98b4a10c8d9968541973530dc274AB2327",1],
// ["0x7FB58B22A67B85a27EeE7B309917Ff3b4Daf3FfD",1],
// ["0x295f1b268B7ac8131242fF755a2D7BF7E9068Ee1",1],
// ["0x5B1E3b98b4a10c8d9968541973530dc274AB2327",5],
// ["0x46c1c1C21117d70C6cCE18FD6f90CE6dF6FAB6E7",1],
// ["0xA4368Af6a9D5a532cD3c1DFB3225cf802aD39721",2],
// ["0x4B14656fA871095ebed21fEE182C7B8ed0996E4d",1],
// ["0x34113eA153403b7dd645B1456d16D17AdC93285f",1],
// ["0x0D259Acb71Db9d1A462296cD946aE58179bB5730",3],
// ["0x5B1E3b98b4a10c8d9968541973530dc274AB2327",1],
// ["0xbaFaAA39773180a6388718b09Ca45bD5e76c858C",2],
// ["0xD6E5ae57a6410eA2449a7C48ee319044Baae7c7b",1],
// ["0x6638146E59FA16d58ae33955386CBaf6FB28C256",1],
// ["0x527f22e0eAC2aAd80BB9e7c95795166d4947FD9D",1],
// ["0xa346f202190Ae78d8D087805B0B14F0cF3889359",1],
// ["0x34fE8E3b8937C0f3fA9f45bcBB4105F32107fd3f",1],
// ["0x50310258C8DeCf0C102B6d0e128623Ab84341fe6",1],
// ["0xe3b82876C80a838aC6876E5aB1d9Df97e67F5ECC",1],
// ["0xA55aA15cAd2988f0661F0833744094a58D0bEA7C",2],
// ["0xFd47a4493159654B998ceAc9F3085C828275fc7c",1],
// ["0xA55aA15cAd2988f0661F0833744094a58D0bEA7C",1],
// ["0x8110d0eD5aE9609DF8f6DA1109a9bE2c21E10109",2],
// ["0x7a89838e2B1d0496512e1664C3D7c1C0437Dc99D",1],
// ["0x98abe81778C9b931C7B1A8d1Ac6591544507486F",2],
// ["0x09563d6b5E212e1aE4842251363780E9Ad4bB189",1],
// ["0xda7Aa2a2dE509a11B885f32bDEdCa0B6D05a1a0d",2],
// ["0x2b63AF5a2B88c2884a9A0f50389e38C630af5FE1",1],
// ["0xFF893079A025130A061042627A447aF94F87e331",1],
// ["0xE08548b49BAf567973cEeE28B53d6e873F8973aF",1],
// ["0x0bD4E60226ABFD8b0Cc426A5460669855947Eca3",1],
// ["0x16e89e7AF8441e29F997f34D911Bc665e3b240Be",1],
// ["0xEc00CFc52C2190D27F42e75410335f037d255478",5],
// ["0x0ea0a9F95A9bAb52E82AAbe792881253D63F2372",1],
// ["0x05F4A3c816B8079D1f2Fe5e8d31f181Ee4242c2C",1],
// ["0x21D374E62e768Faf65d1bc11C2959A84AaB0f678",4],
// ["0x295f1b268B7ac8131242fF755a2D7BF7E9068Ee1",1],
// ["0x449CAc1cFD1fBcC1A2dDB1a675A71189D645A7F1",1],
// ["0x28B541B23247cc98ed61f30258d6401e3c617e5a",1],
// ["0x54E303c3579e35828297d97258129A47Ec1525EF",1],
// ["0x98C66bA66056F6Cf2897540983Ae8295Eb9Ea89c",1],
// ["0x4D63d39f0aFE23527Db57F7Eab4dF4bb14cA0003",2],
// ["0x5fda095611b86227f5881dEe9D0A93286161f9F1",1],
// ["0xe450F53F77cfCe847deF015b901f3a8F831D51C7",1],
// ["0x77B484c0dc0Ee684Dda5D3fB51a953C896C3bB4c",2],
// ["0x860C54Ba5dC0DeB83e133c79A7D43DDcEf2a6C85",1],
// ["0xC8346e059B3F27a0C0B1D2F623C5d84C57f67a4E",2],
// ["0x07cB6c751694f0dfEF01F28d4FAC3CDeB4fB64Cc",2],
// ["0x17E1C4dcA060bB83c4bFE943Be245bd518fb4611",1],
];

exports.data = data;