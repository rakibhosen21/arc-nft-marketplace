'use client';

import Link from "next/link";
import { Heart, Eye } from "lucide-react";
import { MediaRenderer } from "thirdweb/react";
import { client, formatUSDC, resolveIpfsUrl } from "@/lib/thirdweb";
import type { DirectListing } from "thirdweb/extensions/marketplace";

interface ListingCardProps {
  listing: DirectListing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const metadata = listing.asset?.metadata;
  const name = metadata?.name ?? `Token #${listing.tokenId}`;
  const image = resolveIpfsUrl(metadata?.image ?? "");
  const price = listing.pricePerToken;

  return (
    <Link href={`/nft/${listing.id}`} className="block card-hover">
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#0d0d1e",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-[#0d0d1e]">
          {image ? (
            <MediaRenderer
              client={client}
              src={image}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              className="transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: "rgba(124,58,237,0.1)" }}
            >
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 32 }}>?</span>
            </div>
          )}
          <div
            className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold"
            style={{ background: "rgba(124,58,237,0.85)", color: "#fff" }}
          >
            #{String(listing.tokenId)}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs truncate" style={{ color: "rgba(255,255,255,0.45)" }}>
              Listing #{String(listing.id)}
            </span>
          </div>

          <h3 className="font-semibold text-white text-sm mb-3 truncate">{name}</h3>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                Price
              </p>
              <p className="font-bold text-white">
                {formatUSDC(price)}{" "}
                <span style={{ color: "#7c3aed" }}>USDC</span>
              </p>
            </div>
            <div className="flex items-center gap-3" style={{ color: "rgba(255,255,255,0.35)" }}>
              <span className="flex items-center gap-1 text-xs">
                <Heart size={13} /> 0
              </span>
              <span className="flex items-center gap-1 text-xs">
                <Eye size={13} /> 0
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
