const ADDRESSES = require("../helper/coreAssets.json");

const MUSD_ETHEREUM = "0xdD468A1DDc392dcdbEf6db6e34E89AA338F9F186";

const BRIDGED_TOKENS = [
  ADDRESSES.ethereum.tBTC,    // tBTC  → native BTC on Mezo
  ADDRESSES.ethereum.WBTC,    // WBTC  → mWBTC on Mezo
  ADDRESSES.ethereum.cbBTC,   // cbBTC → mcbBTC on Mezo
  "0x7A56E1C57C7475CCf742a1832B028F0456652F97", // SolvBTC    → mSolvBTC
  "0xd9D920AA40f578ab794426F5C90F6C731D159DEf", // SolvBTC.BBN (xSolvBTC) → mxSolvBTC
  "0x8DB2350D78aBc13f5673A411D4700BCF87864dDE", // swBTC      → mswBTC
  ADDRESSES.ethereum.DAI,     // DAI   → mDAI
  ADDRESSES.ethereum.USDT,    // USDT  → mUSDT
  ADDRESSES.ethereum.USDC,    // USDC  → mUSDC
  ADDRESSES.ethereum.CRVUSD,  // crvUSD
  ADDRESSES.ethereum.USDe,    // USDe  → mUSDe
  "0xCFC5bD99915aAa815401C5a41A927aB7a38d29cf", // thUSD
  "0xCdF7028ceAB81fA0C6971208e83fa7872994beE5", // T (Threshold Network) → mT
  "0xC96dE26018A54D51c097160568752c4E3BD6C364", // FBTC → mFBTC
  MUSD_ETHEREUM ,//MUSD ethereum
// "0x8e4cbBcc33dB6c0a18561fDE1F6bA35906d4848b", // MEZO token on ETH (bridged to Ethereum)
];


// Add these constants at the top once confirmed
const MEZO_BASE  = "0x8e4cbBcc33dB6c0a18561fDE1F6bA35906d4848b";   // MEZO token on Base
const MUSD_BASE  = "0xdD468A1DDc392dcdbEf6db6e34E89AA338F9F186";   // mUSD token on Base
const USDC_BASE  = ADDRESSES.base.USDC;
const AERO_BASE="0x940181a94A35A4569E4529A3CDfB74e38FD98631";

// Aerodrome CL pool addresses (MEZO/mUSD, mUSD/USDC, etc.)
const AERODROME_POOLS = [
    "0xff56d037d948fad1027a1ac82ae610e4b694c641", //USDC/MUSD
    "0xef458a3263d2a8c7f3ed9e949ae2f9b345d08b1f" ,//MEZO/MUSD
    "0xfcd3f5ca230e7c1bd5b415eb85d5186346de0fec",
    "0x47ad9df12a83ad34298f8caee5535092433c14c0",
    "0x0dd2076128fae11da3d0f5522d3a52b532af3741",
    "0x4e9cf654c594527198f1243331a7ca9a46cb7606"
];

// const MEZO_POOLS=[
//   "0xCC372B7E15535aB225fe17c1075831D38ef7aC1a", // MEZO/mUSD pool on Mezo chain
//   "0x1D6e8D24c133535F2d00676F66a0e824f84765ff", // mUSDC/mUSD pool on Mezo chain
//   "0x9CBc1537d255768b431488305b1C7EFc2ac95022", // mUSDC/mUSDe pool on Mezo chain
//   "0xEd812AEc0Fecc8fD882Ac3eccC43f3aA80A6c356",
//   "0xEd812AEc0Fecc8fD882Ac3eccC43f3aA80A6c356",
//   "0x52e604c44417233b6CcEDDDc0d640A405Caacefb",
//   "0x72E6b3F126cF4F6C90C08114aC29038A0E269210",
//   "0x10906a9E9215939561597b4C8e4b98F93c02031A",
//   "0x2a1ab0224a7a608d3A992Cb15594a2934F74f4C0",
// ]

const MEZO_MAINNET_BRIDGE = "0xF6680EA3b480cA2b72D96ea13cCAF2cFd8e6908c";

const MORPHO_MUSD_VAULT = "0x52317a47585A6ACDfbD7a29B494c3E2baAE96aBc";

const CURVE_MUSD_USDC_POOL = "0xb5571e76693ba60110b5811dd650ffefce1c955f";

const MUSD_SAVINGS_VAULT = "0xb4D498029af77680cD1eF828b967f010d06C51CC"; 

const cbBTC_VAULT = "0x8FB0EB4BB6CA5cf3883E83734BD5bD77a87CC20E"; 

const BTC_VAULT="0xE2232789D4cF5bb1ffaDA1a105Cc59B18d639318"

const stableCoinVaults = "0xc5834dc9EDe2b1d6aE7e52150e95Ccfd12df0999"

const UNI_V4_POOL_MANAGER = "0x000000000004444c5dc75cB358380D2e3dE08A90";
const UNI_V4_POOL_TOKEN0 = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; 
const UNI_V4_POOL_TOKEN1 = "0xdD468A1DDc392dcdbEf6db6e34E89AA338F9F186"; 

// async function ethereumTvl(api) {
//   await api.sumTokens({
//     owner: MEZO_MAINNET_BRIDGE,
//     tokens: [...BRIDGED_TOKENS],
//   });

//   // await api.sumTokens({
//   //   owner: UNI_V4_POOL_MANAGER,
//   //   tokens: [UNI_V4_POOL_TOKEN0, UNI_V4_POOL_TOKEN1],
//   // });


//   await api.sumTokens({
//     owner: CURVE_MUSD_USDC_POOL,
//     tokens: [ADDRESSES.ethereum.USDC,ADDRESSES.ethereum.USDT,MUSD_ETHEREUM],
//   });

//   const morphoTotalAssets = await api.call({
//     abi: 'function totalAssets() public view returns (uint256)',
//     target: MORPHO_MUSD_VAULT,
//   });

//   api.add(MUSD_ETHEREUM, morphoTotalAssets);

// //   await api.sumTokens({
// //     owner: MORPHO_MUSD_VAULT,
// //     tokens: [ADDRESSES.ethereum.tBTC, ADDRESSES.ethereum.cbBTC],
// //   });

// //   await api.sumTokens({
// //     owner: CURVE_MUSD_USDC_POOL,
// //     tokens: [MUSD_ETHEREUM, ADDRESSES.ethereum.USDC],
// //   });
// }



// Pre-mainnet Portal — still holds tBTC/WBTC deposited before mainnet launch
const MEZO_PORTAL_PROXY = "0xAB13B8eecf5AA2460841d75da5d5D861fD5B8A39";

// Also the BitcoinDepositor contract which handled BTC→tBTC flow
const BITCOIN_DEPOSITOR = "0x1D50D75933b7b7C8AD94dbfb748B5756E3889C24";

// tBTC vault that holds tBTC backing
const TBTC_VAULT = "0x9C070027cdC9dc8F82416B2e5314E11DFb4FE3CD";

const TBTC_ETHEREUM = "0x18084fbA666a33d37592fA2633fD49a74DD93a88";
const WBTC_ETHEREUM = "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599";

async function ethereumTvl(api) {
  // NEW BRIDGE (post-mainnet)
  await api.sumTokens({
    owner: MEZO_MAINNET_BRIDGE,
    tokens: [...BRIDGED_TOKENS],
  });

  // OLD PORTAL (pre-mainnet) — tBTC + WBTC locked here before migration
  await api.sumTokens({
    owner: MEZO_PORTAL_PROXY,
    tokens: [TBTC_ETHEREUM, WBTC_ETHEREUM],
  });

  // BitcoinDepositor — intermediate contract in BTC→tBTC→Mezo flow
  await api.sumTokens({
    owner: BITCOIN_DEPOSITOR,
    tokens: [TBTC_ETHEREUM],
  });

  // tBTC Vault on Ethereum
  await api.sumTokens({
    owner: TBTC_VAULT,
    tokens: [TBTC_ETHEREUM],
  });

  // Curve MUSD/USDC pool
  await api.sumTokens({
    owner: CURVE_MUSD_USDC_POOL,
    tokens: [ADDRESSES.ethereum.USDC, ADDRESSES.ethereum.USDT, MUSD_ETHEREUM],
  });

  // Morpho vault
  const morphoTotalAssets = await api.call({
    abi: 'function totalAssets() public view returns (uint256)',
    target: MORPHO_MUSD_VAULT,
  });
  api.add(MUSD_ETHEREUM, morphoTotalAssets);
}

const POOL_FACTORY = "0x83FE469C636C4081b87bA5b3Ae9991c6Ed104248";


async function mezoChainTvl(api) {
  const poolCount = await api.call({
  target: POOL_FACTORY,
  abi: 'function allPoolsLength() view returns (uint256)',
  // chain: 'mezo',
});

const poolAddresses = await api.multiCall({
  target: POOL_FACTORY,
  abi: 'function allPools(uint256) view returns (address)',
  calls: Array.from({ length: Number(poolCount) }, (_, i) => ({ params: [i] })),
  // chain: 'mezo',
});

const token0s = await api.multiCall({
  abi: 'function token0() view returns (address)',
  calls: poolAddresses.map(p => ({ target: p })),
  // chain: 'mezo',
});

const token1s = await api.multiCall({
  abi: 'function token1() view returns (address)',
  calls: poolAddresses.map(p => ({ target: p })),
  // chain: 'mezo',
});

// Group unique tokens per pool, then call sumTokens once per pool
for (let i = 0; i < poolAddresses.length; i++) {
  const tokens = [];
  if (token0s[i]) tokens.push(token0s[i]);
  if (token1s[i]) tokens.push(token1s[i]);

  if (tokens.length > 0) {
    await api.sumTokens({
      owner: poolAddresses[i],
      tokens,
    });
  }}
  // await api.sumTokens({ ownerTokens });

  // Read totalSupply() from known Mezo vault contracts and add as token balances.
  const vaultTokenMap = {
    [MUSD_SAVINGS_VAULT]: ADDRESSES.mezo.MUSD,
    [cbBTC_VAULT]: ADDRESSES.mezo.mcbBTC,
    [BTC_VAULT]: ADDRESSES.mezo.mFBTC,
    [stableCoinVaults]: ADDRESSES.mezo.mUSDC,
  };

  const abi = 'function totalSupply() view returns (uint256)';
  const vaults = Object.keys(vaultTokenMap).filter(Boolean);

  await Promise.all(vaults.map(async (vault) => {
    try {
      const supply = await api.call({ target: vault, abi });
      const token = vaultTokenMap[vault];
      if (supply && token) api.add(token, supply);
    } catch (e) {
      // non-fatal: some vaults may not implement totalSupply or call may fail
      console.log('mezo: failed to read totalSupply for', vault, e.message || e.toString());
    }
  }));

  return api.getBalances();
}


async function baseTvl(api) {
     await api.sumTokens({
    owners: AERODROME_POOLS,
    tokens: [MEZO_BASE, MUSD_BASE, USDC_BASE,AERO_BASE],
  });
}

// ─── Module export ────────────────────────────────────────────────────────────

module.exports = {
  hallmarks: [
    ["2025-05-23", "Mezo Mainnet Migration — bridge migrated from portal proxy to MezoBridge"],
    ["2026-02-19", "Velar PerpDEX exploit via Upshift vault curator"],
    ["2026-04-02", "MEZO Token Launch — TVL acceleration begins"],
  ],

  methodology:
    "Sums ERC-20 tokens locked in the MezoBridge contract on Ethereum mainnet " +
    "(bridged_tvl), plus assets under management in the Morpho Alpha MUSD Core " +
    "Vault via ERC-4626 totalAssets() (morpho_tvl), plus MUSD and USDC held in " +
    "the Curve MUSD/USDC liquidity pool on Ethereum (curve_lp_tvl). " +
    "Mezo chain native DEX pools and MUSD Savings Vault are excluded pending " +
    "contract address confirmation. Aerodrome Base CL pools excluded pending " +
    "MEZO/MUSD Base token address confirmation. " +
    "The Upshift vault is excluded following the February 2026 Velar exploit.",

  ethereum: {
    tvl: ethereumTvl,
  },

  mezo: {
    tvl: mezoChainTvl,
  },

  base: {
    tvl: baseTvl,
  },
};