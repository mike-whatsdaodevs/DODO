let data = [
// ["0xc6aFd23A13d420828d424E327A7de4d5bA36e27C",20],
// ["0xc6aFd23A13d420828d424E327A7de4d5bA36e27C",20],
// ["0xc6aFd23A13d420828d424E327A7de4d5bA36e27C",10],
// ["0xc97A55c16d40518Df1E8fb718Fd66b8C97524D05",9],
// ["0xC0ED75b4349CB2D2d92A8138494a518F5bfBB93a",4],
// ["0x98fF6e185bFAD21C2DE62B607077059ff6955d35",3],
// ["0xfdB7266DA41d2b3d872459eE4CB8037c11EB84BF",2],
// ["0x6f5A21519d20317505544832626A54336584649F",2],
// ["0xd8BCD0e2359f3aFdED631053912E803e3829E34b",2],
// ["0xd13ec746f3e9f1Df4b3B50EFF7CeFAf6E28eE6Db",2],
// ["0xe93851fEd55D01A7092D26bF1008e842d35A6DC2",2],
// ["0x8f07BDe5630f5766B3A98eB8A53272f9E1Bd9f44",2],
// ["0x742e1F56D237D047561B62761a327768BA4DFaB1",1],
// ["0x85cB4073045EA6E2fF1d8e58A5A84d99ae7bfbC5",1],
// ["0x41CDe64438ecA8D5515334380456098D9DCa7A1a",1],
// ["0x5D2F9971dD69c96d77375ea9381D176e78007d97",1],
// ["0xb53124AF47910A52Ae5c0dc404A0184e1B5799C3",1],
// ["0x4391764EFb003C94692C7734ac284e584262a668",1],
// ["0xfdB7266DA41d2b3d872459eE4CB8037c11EB84BF",1],
// ["0xF021CD5D0894392e1AcE119ac65820Ea78E1ad3b",1],
// ["0xeB9F736e5027F5bf53322335199c7b241bA93f61",1],
// ["0xE95a1C35c554B016DaB8384fAc1a382517B7F3e1",1],
// ["0xbABDf07A2B587ea551cD167021626c28ea3ad40A",1],
// ["0x98f9B99935856d51C7f65D0832D05AB56C2862cf",1],
// ["0x923B3b06B300b0487d8E0baf57227434937C74D6",1],
// ["0x7614e00A24F00d423000749E8F9652fECb819D31",1],
// ["0xB77F635396C1fc327e5bAB4b2FF6D5Fa79595793",1],
// ["0xdE273d0c8bA1D7E3aa4976f30F73b2335E07C589",1],
// ["0xD88bC98f64999B5734301EDB3237d8c0f2DaB780",1],
// ["0xB80CB018CdE7fB12b524CFc03E194106612b09CF",1],
// ["0x98fF6e185bFAD21C2DE62B607077059ff6955d35",1],
// ["0x964208E7fF28b30718d133350e43ffFd47D99eD3",1],
// ["0x817810187B7C00f11C89a76176aAf63CBdd1786C",1],
// ["0x207718B5B8caA6d18D03d67583b280aFb6508D26",1],
// ["0x07cB6c751694f0dfEF01F28d4FAC3CDeB4fB64Cc",1],
// ["0xFFa717A5295BF3e0410b52f388926DF67049FB56",1],
// ["0xfC4F67c62b8Ce590f07C9B9Ab6a211549f371196",1],
// ["0xfb8cFcEB5c889052e658340f189fB8F508224985",1],
// ["0xFB42E9FC725516FC2905074A3134AB417B08097C",1],
// ["0xfB0ef97a158a6911656422Abaf025C0f548F6927",1],
// ["0xFA508fE018d8827Ee4929E453f568f7fBA5fe4c1",1],
// ["0xf9E0e896fD84630ae2B90DCF4c55124D4f8513F7",1],
// ["0xf825aDa9aDca6E49B202Ce5a67eF63803cD23C88",1],
// ["0xF5FDd6381dc52E69CF1801a63527737923114891",1],
// ["0xf4f6D1ee6F28fA8a412A7A4DdC09c46133B3BF32",1],
// ["0xf314D0451d21E5789F51703F85B09c5cc275e5dd",1],
// ["0xF1b738aCfAcA2BAd54903f3E28232B9D8e589064",1],
// ["0xecD40Db45a7B4109D8d3B47E7BF013f9026a600c",1],
// ["0xEca25f9943C5D8700b4623D8ACD79D909A8AE84e",1],
// ["0xEca25f9943C5D8700b4623D8ACD79D909A8AE84e",1],
// ["0xEca25f9943C5D8700b4623D8ACD79D909A8AE84e",1],
// ["0xe9f72869f1a461A370C9EC372E31e08713Ef5384",1],
// ["0xe9f72869f1a461A370C9EC372E31e08713Ef5384",1],
// ["0xE95a1C35c554B016DaB8384fAc1a382517B7F3e1",1],
// ["0xE95a1C35c554B016DaB8384fAc1a382517B7F3e1",1],
// ["0xe93851fEd55D01A7092D26bF1008e842d35A6DC2",1],
// ["0xE56394F8b5cefFF13e2BC1fabc8D5eaE74C78d3e",1],
// ["0xe0893C97be133Ad9D9754f0B2F12D7347942f630",1],
// ["0xDFc83C852C4b2690E2E83Ea61Dd17F4d21E2419B",1],
// ["0xDFc83C852C4b2690E2E83Ea61Dd17F4d21E2419B",1],
// ["0xDFc83C852C4b2690E2E83Ea61Dd17F4d21E2419B",1],
// ["0xDFc83C852C4b2690E2E83Ea61Dd17F4d21E2419B",1],
// ["0xDFc83C852C4b2690E2E83Ea61Dd17F4d21E2419B",1],
// ["0xDFc83C852C4b2690E2E83Ea61Dd17F4d21E2419B",1],
// ["0xd8Edc683d58acD7C3C2D9227034c3D43fA5a293f",1],
// ["0xd7f5eF746e315102Fbb338FA09fA9cED723bA60e",1],
// ["0xD7A094383e973327B3CEb44d4f583949b5B7e586",1],
// ["0xD326f54a259FD07F561Da66F8bDB63c46A39f6D2",1],
// ["0xD25135b85CBfF15d9C9FeB2D99E7c11564F5f616",1],
// ["0xd136d23643A2eBeE50Bbe62F20B3E77aFF7c4a30",1],
// ["0xCf7bAe221C40ac3CE9Bde74d5aab2Cf5FC19B98e",1],
// ["0xcF49112323ae43ad00DA325891A515195D30cBF8",1],
// ["0xCF0dABB78a49a2a6b05624a4CbeC141c29AeC246",1],
// ["0xCEa460a257C902Bc311CF7122c632ea91B350Ad7",1],
// ["0xce840240e4522666F3375C6406A26e7454cEA252",1],
// ["0xCe203BFAECfBa39A9fa72A11aaaE14110BF06f8C",1],
// ["0xcCA266045F7e5637125Fae18e23A8e3d5fCa890f",1],
// ["0xCBB098E3748e054a438c21222703e920F957B89b",1],
// ["0xCBB098E3748e054a438c21222703e920F957B89b",1],
// ["0xCb31A9183450aD88B988Ab867747D37f4f49B5e7",1],
// ["0xCb31A9183450aD88B988Ab867747D37f4f49B5e7",1],
// ["0xCb31A9183450aD88B988Ab867747D37f4f49B5e7",1],
// ["0xCA89BB9c81c1F648C205e2D13963077B52349dA0",1],
// ["0xcA77Bc9eDF34a2BCBEb88A104FC030A7D1828DF6",1],
// ["0xc97A55c16d40518Df1E8fb718Fd66b8C97524D05",1],
// ["0xc945C63b344FB9DA059Ec9507F13cf4676c3A739",1],
// ["0xc919ba3418FC2A4c4BE93bDe2C77f3c0fB9fB74D",1],
// ["0xc55bC56ddAEaA851f987F05A8B728B175E481cB6",1],
// ["0xC48065ae904559418D10346012508E5eD272f26F",1],
// ["0xC48065ae904559418D10346012508E5eD272f26F",1],
// ["0xc41a9E83A70acAe99ABBAa75C8B18917cd695a7F",1],
// ["0xC35C08e4EA7471342005820afEb1c2c92DB42B69",1],
// ["0xC106414bc8bf5b9Cc50d4Fdb6993dC539eeABB56",1],
// ["0xBe2b0c991084fC9F09c92835Dc1E7E2638E85E99",1],
// ["0xBDED975936fae44e3B4703AF8eE4855C7EC677E6",1],
// ["0xBB637e4e23c81cac2992624E4382612BdB93aDc6",1],
// ["0xBAd9FF92432deCCA46a254d0C097B944641d08dD",1],
// ["0xB6B0ff18860f1E29Bf5432cb7410Ca6B64EAB828",1],
// ["0xB63373d4a36e25054453188814Aa139c69A5eB64",1],
// ["0xb61e3a688EC54259Ca59AaA21C726BDaF0486ab3",1],
// ["0xb4Ac2f77C295a5e6D596a82bf26Bbdcc27fff29F",1],
// ["0xB471dF7Df817d9cC1835b64Cec9C3e7a4ab564fb",1],
// ["0xB40A9e1f7fd47C4446717BC98ED5735D808bB6e5",1],
// ["0xAfbf05e50eE3e445917a4e6D2C1C0989c39A2C42",1],
// ["0xae75f14718c435BA2F62B0340843FCF976cc935b",1],
// ["0xa92972F8d2826d9f498A5166874Ed5C1f11562B2",1],
// ["0xa82CA35d598973C8386EE1FeCc52F16F646f26A2",1],
// ["0xA78d8409C14701D05864919E677C4e31f31740cf",1],
// ["0xA78d8409C14701D05864919E677C4e31f31740cf",1],
// ["0xa72eda5ae9D75282B01Dd25621016C73c1aff766",1],
// ["0xa6968db038a1E231841916CBDd921B817b37cd9A",1],
// ["0xA582FD13b2BECe3c4eEc404c56770c67362438F5",1],
// ["0xA2Fb0d7f3c69266d65E6730f6EB3F26CD140DC92",1],
// ["0x9FEc15a9e772a2A7BC4F178842d03904809562fd",1],
// ["0x9C84F040570aF8e85BF9e8d38b57Cfe4ea5bE311",1],
// ["0x9C84F040570aF8e85BF9e8d38b57Cfe4ea5bE311",1],
// ["0x9C84F040570aF8e85BF9e8d38b57Cfe4ea5bE311",1],
// ["0x9C84F040570aF8e85BF9e8d38b57Cfe4ea5bE311",1],
// ["0x9C84F040570aF8e85BF9e8d38b57Cfe4ea5bE311",1],
// ["0x9C84F040570aF8e85BF9e8d38b57Cfe4ea5bE311",1],
// ["0x9C84F040570aF8e85BF9e8d38b57Cfe4ea5bE311",1],
// ["0x9C559724E0e1B7797E01c9DCD225832B42924a26",1],
// ["0x9b670e328720bAA0a1bE00083E4fE0942aF576C6",1],
// ["0x99539427C4341eFD7dEd2e2A8139829B8E768EBd",1],
// ["0x99539427C4341eFD7dEd2e2A8139829B8E768EBd",1],
// ["0x9915ee6a15515065D504E52985F7F61e8879aA68",1],
// ["0x98f9B99935856d51C7f65D0832D05AB56C2862cf",1],
// ["0x9884c7D63015aED0fd837d8982B80F1D8D42fdd8",1],
// ["0x9884c7D63015aED0fd837d8982B80F1D8D42fdd8",1],
// ["0x9829Bc5D2F28c12F0324e9B7dD2eB3954D2CB020",1],
// ["0x97285C9DDA6035fE4E6cf637D1e2aaDaf384F97f",1],
// ["0x97285C9DDA6035fE4E6cf637D1e2aaDaf384F97f",1],
// ["0x97285C9DDA6035fE4E6cf637D1e2aaDaf384F97f",1],
// ["0x95EBdE6a7C0A91699EAC972C8cD3284F45d5e1e5",1],
// ["0x959fE0BDa9f77c96daABDC036462D138059471DE",1],
// ["0x94606943855C8c5A74f9ff5146a5a5b5B075c9f1",1],
// ["0x94606943855C8c5A74f9ff5146a5a5b5B075c9f1",1],
// ["0x93693001b2f5424Fe10Db3e9f871Bb4Bb3b2763a",1],
// ["0x908faB02e274B95063D9469B0CAee98E2bAa3A51",1],
// ["0x908faB02e274B95063D9469B0CAee98E2bAa3A51",1],
// ["0x908faB02e274B95063D9469B0CAee98E2bAa3A51",1],
// ["0x8Fd1a4c24445855a94924E0610C52A90f30Cbe2C",1],
// ["0x8B1e606d01BbBdf719f01d4ae1e16c85f16D5Ddb",1],
// ["0x8655e0B7B638aEa67954b5769fe776F9d7fE5d2A",1],
// ["0x7FB58B22A67B85a27EeE7B309917Ff3b4Daf3FfD",1],
// ["0x7DfBB9c7f8a1729fE8FC0aed76F96DADF112b1C5",1],
// ["0x7De3576BF286B700C57352a4c68A1aDC6e68d4F7",1],
// ["0x7C63046EcB32C981D8Ee6dc37EAd21d9780706B7",1],
// ["0x7C3C89F4A4eA94701A4df6DDfBFbAa397E9a2cB8",1],
// ["0x797AE5db300C70ab38252C94dD1747Af562d609b",1],
// ["0x78B3e73be2499ED4a0c96b7a86FBc8103CC46cE6",1],
// ["0x76352E055c1af975eaBbB6E4F337164852b97C30",1],
// ["0x75c7A6C271C4c895Aaf8E61D04AF4B22D7dE3cD9",1],
// ["0x7218816ac80F2929B3ACFc338fBa90eD3bdA560A",1],
// ["0x6f17d3B24b0914196d95bBB5309834846B3C1361",1],
// ["0x6c5B584EA34A46A94875A3E536D6dD3BF545d555",1],
// ["0x686A0Aa1F5DF184333062fbe4ED12AfFb3209885",1],
// ["0x6768d7EFdC6AB6A4785c3AB416B9E3bFf9A8599B",1],
// ["0x5F15c7bBf37E252105c7cbFA8cD2AdcC86973F7b",1],
// ["0x5d625650728fDdadf069183E92fB9c751CbAAc28",1],
// ["0x5B5029D535504391BaC5c4CdC74645bf5b04c733",1],
// ["0x58c04c705D56D096398832A39bC1874D7474dbF3",1],
// ["0x58c04c705D56D096398832A39bC1874D7474dbF3",1],
// ["0x5882c75145a0CA86461E484dD3dC91172266DD54",1],
// ["0x5859F29D9ec879587dE242767901f3c7F8dB3005",1],
// ["0x5859F29D9ec879587dE242767901f3c7F8dB3005",1],
// ["0x5859F29D9ec879587dE242767901f3c7F8dB3005",1],
// ["0x4c1d44849a3394D8c74ac467A7c9f9dbDDB7c0C0",1],
// ["0x4B5EDA3ab73e95CdbF20347E75e0e6062749CA4F",1],
// ["0x4a9F367D8d2D27E435AA9AC20d11929C35bB8C17",1],
// ["0x46997Ec2715a3e4A195DcBEcaF49952EEc7b7732",1],
// ["0x46997Ec2715a3e4A195DcBEcaF49952EEc7b7732",1],
// ["0x4610592aCaB97Fc3C29cCd4cd16336Be890e93CF",1],
// ["0x4391764EFb003C94692C7734ac284e584262a668",1],
// ["0x415a194515fCCc1Bb0b7B2a60C0D42b0F8C874ed",1],
// ["0x406221A4d97FF427d799321Fe33541b1706dDE83",1],
// ["0x3fdCBafCD7FffcaD6e8a2E4B3Da99512Dcf22aF0",1],
// ["0x3e3A651bF559480327B1F702BA26B5a5fCE6aF4A",1],
// ["0x3D99D60c39F4cb832552238e26d582d6CfE1d62F",1],
// ["0x3d2A31A31FA30e4E89BbE947064e2146e095C1B3",1],
// ["0x3C808f0e82432AAC68aa611cc5066c369Ce23E53",1],
// ["0x3bcF0266eEF7CEAc01a56D250486d33e6F78E8Dd",1],
// ["0x36eb26A481CfFDe1187245AD1F7b56079D48a8D0",1],
// ["0x330d108560791C1744aa7fB0B7713b43E4DeebaB",1],
// ["0x314Cbd36c055B9605d85a25A2f35Bda690Da0FE8",1],
// ["0x30D67277E6dA5604e38FD5c81abeca4b73A76522",1],
// ["0x30D67277E6dA5604e38FD5c81abeca4b73A76522",1],
// ["0x30D67277E6dA5604e38FD5c81abeca4b73A76522",1],
// ["0x30D67277E6dA5604e38FD5c81abeca4b73A76522",1],
// ["0x30D67277E6dA5604e38FD5c81abeca4b73A76522",1],
// ["0x2fd069CD19617c797eA4aFf225EF826cd94d737A",1],
// ["0x2ca2b2Dbd1eECac9677D1833c9F7D9938bC68404",1],
// ["0x2AedD8B1268746Bc39b8a7F8416F4A77BF6dE379",1],
// ["0x2AedD8B1268746Bc39b8a7F8416F4A77BF6dE379",1],
// ["0x296F72CBC8eB3E16b5464ec8f57B3a30eE22172C",1],
// ["0x2939dfb2A43CAC6dfb1D52656534f5C5acdeee79",1],
// ["0x289052ab5AB7F935f4c8e0d5349443Ffb6358972",1],
// ["0x28193A7A499Cc293cF60C87251034C2800779c18",1],
// ["0x24BBE05a78E89E8fB7a8122Dc7EbAb364e240710",1],
// ["0x24BBE05a78E89E8fB7a8122Dc7EbAb364e240710",1],
// ["0x23ed439ca27e9562764FD5aa04b1D56d4F7d4F83",1],
// ["0x1FE270527FAfb1C9D004781e8f3dd56F893A4854",1],
// ["0x1F7Bda8C3A86E4994147ef4004f1516EAE60Af4e",1],
// ["0x1F7Bda8C3A86E4994147ef4004f1516EAE60Af4e",1],
// ["0x1D92A4E4c9abFF0559879409c540f79A2e3EaE73",1],
// ["0x18555E924f53d64e948055c71593d1B5390AafB2",1],
// ["0x1454B751370E0Da68092dcFf3dA629218ef9b1F3",1],
// ["0x1348519cF5DE19806342511B8885B8B448D10C49",1],
// ["0x0E70831e1CA3bB98372b456A5F05160b46722195",1],
// ["0x0c645A30Ed6A58932cD86e3D3Bf101E5acEa03de",1],
// ["0x0BC1dcCcD06b2Ce563E69578DC6B7B043a1bAEea",1],
// ["0x0BC1dcCcD06b2Ce563E69578DC6B7B043a1bAEea",1],
// ["0x0BC1dcCcD06b2Ce563E69578DC6B7B043a1bAEea",1],
// ["0x0BC1dcCcD06b2Ce563E69578DC6B7B043a1bAEea",1],
// ["0x07F5fdd9CceC645E9F6A9E229bD2e16D5ECdc5bd",1],
// ["0x060B6ac9f432CBaC80D6EB1Fb848cFFcF4026d2B",1],
// ["0x04eD0591427F1e575652e3b8Edee5FE20A555aD0",1],
// ["0x049d773d4dC2b52Fa6e75CBe2425a8Bc86d8B2E5",1],
// ["0x006766C21d703FAC08672C295b28cec422a9dd44",1],
// ["0x003b03ab63342958BdCDbeDF6eA577ad0035236C",1],
];


exports.data = data;