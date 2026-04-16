import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID ?? "replit-arc-dev",
});

export const arcTestnet = defineChain({
  id: 5042002,
  name: "Arc Testnet",
  rpc: "https://5042002.rpc.thirdweb.com",
  nativeCurrency: {
    name: "ARC",
    symbol: "ARC",
    decimals: 18,
  },
  testnet: true,
});

export const MARKETPLACE_ADDRESS = "0x978c5EaD69AfC54b96711C5ea5681282F97642a1";
export const NFT_COLLECTION_ADDRESS = "0x12Ad321f4EC3332FA87D55e62dec1EBE17aF73D1";
export const USDC_ADDRESS = "0x3600000000000000000000000000000000000000";

export const marketplaceContract = getContract({
  client,
  chain: arcTestnet,
  address: MARKETPLACE_ADDRESS,
});

export const nftCollectionContract = getContract({
  client,
  chain: arcTestnet,
  address: NFT_COLLECTION_ADDRESS,
});

export function getUsdcContract() {
  return getContract({
    client,
    chain: arcTestnet,
    address: USDC_ADDRESS,
  });
}

export function formatUSDC(priceWei: bigint): string {
  const price = Number(priceWei) / 1_000_000;
  return price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function resolveIpfsUrl(uri: string | undefined): string {
  if (!uri) return "";
  if (uri.startsWith("ipfs://")) {
    return `https://ipfs.io/ipfs/${uri.slice(7)}`;
  }
  return uri;
}
