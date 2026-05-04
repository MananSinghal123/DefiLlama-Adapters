const { sumTokens2 } = require("../helper/unwrapLPs");

const REGISTRY = '0xeb5015fF021DB115aCe010f23F55C2591059bBA0';
const ZAMA_TOKEN = '0xA12CC123ba206d4031D1c7f6223D1C2Ec249f4f3';
const registryGetPairsAbi =
  'function getTokenConfidentialTokenPairs() view returns (tuple(address tokenAddress, address confidentialTokenAddress, bool isValid)[])';

/** Matches dashboard / indexer: aggregate ZAMA in ProtocolStaking pools (not cZAMA). */
const PROTOCOL_STAKING_POOLS = [
  { name: 'KMS ProtocolStaking', address: '0xe9b176CCaA8840DC3b3567bb83e2cD2a6c36F4Ab' },
  { name: 'Coprocessor ProtocolStaking', address: '0x7147485b892158f2B875f7aC5Ea48A9937C66AE8' },
];

async function getPairs(api) {
  return api.call({ target: REGISTRY, abi: registryGetPairsAbi });
}

async function tvl(api) {
  const pairs = await getPairs(api);
  const tokensAndOwners = pairs.map((d) => [d.tokenAddress, d.confidentialTokenAddress]);
  await sumTokens2({ api, tokensAndOwners });
}

async function staking(api) {
  for (const pool of PROTOCOL_STAKING_POOLS) {
    const bal = await api.call({
      target: ZAMA_TOKEN,
      abi: 'erc20:balanceOf',
      params: [pool.address],
    });
    if (bal == null) {
      throw new Error(`zama: staking missing ZAMA balanceOf for ${pool.name} (${pool.address})`);
    }
    api.add(ZAMA_TOKEN, bal);
  }
}

module.exports = {
  methodology:
    "TVL: total public ERC-20 reserves backing confidential wrappers from the on-chain registry, matching aggregate TVS (all tokens, including ZAMA in cZAMA). Staking: ZAMA held in the KMS and Coprocessor ProtocolStaking pool contracts (protocol stake), separate from wrapper reserves.",
  timetravel: true,
  ethereum: { tvl, staking },
};
