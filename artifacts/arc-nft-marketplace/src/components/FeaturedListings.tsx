'use client';

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useReadContract } from "thirdweb/react";
import { getAllValidListings } from "thirdweb/extensions/marketplace";
import { marketplaceContract } from "@/lib/thirdweb";
import ListingCard from "./ListingCard";
import NFTCard from "./NFTCard";
import { nfts } from "@/lib/data";

export default function FeaturedListings() {
  const { data: listings, isLoading } = useReadContract(getAllValidListings, {
    contract: marketplaceContract,
    start: 0n,
    count: 4n,
  });

  const hasListings = listings && listings.length > 0;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {hasListings ? "Live Listings" : "Featured NFTs"}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)" }}>
            {hasListings
              ? "Active listings from the Arc Testnet marketplace"
              : "Handpicked by our curators"}
          </p>
        </div>
        <Link
          href="/explore"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold"
          style={{ color: "#a78bfa" }}
        >
          View All <ChevronRight size={16} />
        </Link>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden animate-pulse"
              style={{ background: "#0d0d1e", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="aspect-square" style={{ background: "rgba(255,255,255,0.04)" }} />
              <div className="p-4 space-y-2">
                <div className="h-3 rounded w-3/5" style={{ background: "rgba(255,255,255,0.06)" }} />
                <div className="h-4 rounded w-4/5" style={{ background: "rgba(255,255,255,0.06)" }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && hasListings && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {listings.map((listing) => (
            <ListingCard key={String(listing.id)} listing={listing} />
          ))}
        </div>
      )}

      {!isLoading && !hasListings && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {nfts.slice(0, 4).map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>
      )}
    </section>
  );
}
