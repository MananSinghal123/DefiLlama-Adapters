const { token } = require("@coral-xyz/anchor/dist/cjs/utils");
const ADDRESSES = require("../helper/coreAssets.json");
const { getLiquityTvl } = require("../helper/liquity");

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
  // MUSD_ETHEREUM ,//MUSD ethereum
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

const MEZO_MAINNET_BRIDGE = "0xF6680EA3b480cA2b72D96ea13cCAF2cFd8e6908c";

const MORPHO_MUSD_VAULT = "0x52317a47585A6ACDfbD7a29B494c3E2baAE96aBc";

const CURVE_MUSD_USDC_POOL = "0xb5571e76693ba60110b5811dd650ffefce1c955f";

const MUSD_SAVINGS_VAULT = "0xb4D498029af77680cD1eF828b967f010d06C51CC"; 

const cbBTC_VAULT = "0x8FB0EB4BB6CA5cf3883E83734BD5bD77a87CC20E"; 

const BTC_VAULT="0xE2232789D4cF5bb1ffaDA1a105Cc59B18d639318"

const stableCoinVaults = "0xc5834dc9EDe2b1d6aE7e52150e95Ccfd12df0999"

const UNISWAP_V3_MUSD_USDC_POOL = "0x748C05B80d07de9692d976bd3173F301356aB945";

async function ethereumTvl(api) {
  // NEW BRIDGE (post-mainnet)
  await api.sumTokens({
    owner: MEZO_MAINNET_BRIDGE,
    tokens: [...BRIDGED_TOKENS],
  });

  await api.sumTokens({
    owner: UNISWAP_V3_MUSD_USDC_POOL,
    tokens: [ADDRESSES.ethereum.USDC, MUSD_ETHEREUM],
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
const TROVE_MANAGER_ADDRESS = "0x94AfB503dBca74aC3E4929BACEeDfCe19B93c193"
const veBTC="0x3D4b1b884A7a1E59fE8589a3296EC8f8cBB6f279"
const VEBTC_CONTRACT  = "0x3D4b1b884A7a1E59fE8589a3296EC8f8cBB6f279";
const VEMEZO_CONTRACT = "0xb90fdAd3DFD180458D62Cc6acedc983D78E20122";
const liquityTVL=getLiquityTvl(TROVE_MANAGER_ADDRESS)

async function mezoChainTvl(api) {
  const poolCount = await api.call({
    target: POOL_FACTORY,
    abi: 'function allPoolsLength() view returns (uint256)',
  });

  const poolAddresses = await api.multiCall({
    target: POOL_FACTORY,
    abi: 'function allPools(uint256) view returns (address)',
    calls: Array.from({ length: Number(poolCount) }, (_, i) => ({ params: [i] })),
  });

  const token0s = await api.multiCall({
    abi: 'function token0() view returns (address)',
    calls: poolAddresses.map(p => ({ target: p })),
  });

  const token1s = await api.multiCall({
    abi: 'function token1() view returns (address)',
    calls: poolAddresses.map(p => ({ target: p })),
  });

//   // Group unique tokens per pool, then call sumTokens once per pool
  for (let i = 0; i < poolAddresses.length; i++) {
    const tokens = [];
    if (token0s[i]) tokens.push(token0s[i]);
    if (token1s[i]) tokens.push(token1s[i]);
    if (tokens.length > 0) {
      await api.sumTokens({
        owner: poolAddresses[i],
        tokens,
      });
    }
  }


await api.sumTokens({ owner: VEBTC_CONTRACT,  tokens: [ADDRESSES.mezo.BTC]  });
await api.sumTokens({ owner: VEMEZO_CONTRACT, tokens: [ADDRESSES.mezo.MEZO] });

  // // Read totalSupply() from known Mezo vault contracts and add as token balances.
  const vaultTokenMap = {
    // [MUSD_SAVINGS_VAULT]: ADDRESSES.mezo.MUSD,
    [cbBTC_VAULT]: ADDRESSES.mezo.mcbBTC,
    [BTC_VAULT]: ADDRESSES.mezo.BTC,
    [stableCoinVaults]: ADDRESSES.mezo.mUSDC
  };

  const abi = 'function totalSupply() view returns (uint256)';
  const vaults = Object.keys(vaultTokenMap).filter(Boolean);

  await Promise.all(vaults.map(async (vault) => {
    try {
      const supply = await api.call({ target: vault, abi });
      const token = vaultTokenMap[vault];
      if (supply && token) api.add(token, supply);
    } catch (e) {
      console.log('mezo: failed to read totalSupply for', vault, e.message || e.toString());
    }
  }));

//strategy vault
  await api.sumTokens({
    owner: "0x0C0944713c185ea3e64F5609ECee3fB3C054a295",
    tokens: [ADDRESSES.mezo.MUSD],
  });
//Idle
  await api.sumTokens({
    owner: "0xb4D498029af77680cD1eF828b967f010d06C51CC",
    tokens: [ADDRESSES.mezo.MUSD],
  });


  // Merge TroveManager (Liquity) collateral into the same api instance
  await liquityTVL(api);
  

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
    "Mezo chain native DEX pools and MUSD Savings Vault are included " +
    "Aerodrome Pools added" ,

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