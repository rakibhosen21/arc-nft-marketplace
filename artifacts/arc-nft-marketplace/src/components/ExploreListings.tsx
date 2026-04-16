'use client';

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, RefreshCw } from "lucide-react";
import { useReadContract } from "thirdweb/react";
import { getAllValidListings } from "thirdweb/extensions/marketplace";
import { marketplaceContract } from "@/lib/thirdweb";
import ListingCard from "./ListingCard";
import { nfts } from "@/lib/data";
import NFTCard from "./NFTCard";

const SORT_OPTIONS = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest First", value: "newest" },
];

export default function ExploreListings() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("price-asc");

  const {
    data: listings,
    isLoading,
    error,
    refetch,
  } = useReadContract(getAllValidListings, {
    contract: marketplaceContract,
    start: 0n,
    count: 100n,
  });

  const filtered = useMemo(() => {
    if (!listings) return [];
    let result = [...listings];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((l) => {
        const name = l.asset?.metadata?.name ?? "";
        return name.toLowerCase().includes(q) || String(l.tokenId).includes(q);
      });
    }
    result.sort((a, b) => {
      if (sort === "price-asc") return Number(a.pricePerToken - b.pricePerToken);
      if (sort === "price-desc") return Number(b.pricePerToken - a.pricePerToken);
      if (sort === "newest") return Number(b.id - a.id);
      return 0;
    });
    return result;
  }, [listings, search, sort]);

  const hasRealListings = listings && listings.length > 0;

  return (
    <div>
      {/* Filters */}
      <div
        className="rounded-2xl p-5 mb-8 flex flex-col lg:flex-row gap-4"
        style={{ background: "#0d0d1e", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "rgba(255,255,255,0.3)" }}
          />
          <input
            type="text"
            placeholder="Search by name or token ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 outline-none"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
        </div>

        <div className="flex items-center gap-3">
          <SlidersHorizontal size={16} style={{ color: "rgba(255,255,255,0.3)" }} />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm py-2.5 px-3 rounded-xl outline-none"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} style={{ background: "#0d0d1e" }}>
                {o.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => refetch()}
            className="p-2.5 rounded-xl transition-all hover:scale-110"
            style={{
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(124,58,237,0.3)",
              color: "#a78bfa",
            }}
            title="Refresh listings"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
          {isLoading
            ? "Fetching live listings from blockchain..."
            : hasRealListings
            ? `${filtered.length} live listing${filtered.length !== 1 ? "s" : ""} on Arc Testnet`
            : "No active listings yet — showing sample NFTs"}
        </p>
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
          style={{
            background: "rgba(6,182,212,0.1)",
            border: "1px solid rgba(6,182,212,0.25)",
            color: "#06b6d4",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#06b6d4" }}
          />
          Arc Testnet Live
        </div>
      </div>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden animate-pulse"
              style={{ background: "#0d0d1e", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="aspect-square" style={{ background: "rgba(255,255,255,0.04)" }} />
              <div className="p-4 space-y-2">
                <div className="h-3 rounded" style={{ background: "rgba(255,255,255,0.06)", width: "60%" }} />
                <div className="h-4 rounded" style={{ background: "rgba(255,255,255,0.06)", width: "80%" }} />
                <div className="h-4 rounded" style={{ background: "rgba(255,255,255,0.06)", width: "40%" }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && !isLoading && (
        <div
          className="rounded-2xl p-6 mb-6 text-center"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
        >
          <p className="text-sm mb-2" style={{ color: "#f87171" }}>
            Could not fetch live listings
          </p>
          <button
            onClick={() => refetch()}
            className="text-xs underline"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Try again
          </button>
        </div>
      )}

      {/* Real listings */}
      {!isLoading && hasRealListings && (
        <>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filtered.map((listing) => (
                <ListingCard key={String(listing.id)} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p style={{ color: "rgba(255,255,255,0.3)" }}>No results match your search</p>
            </div>
          )}
        </>
      )}

      {/* Fallback to demo NFTs when no real listings */}
      {!isLoading && !hasRealListings && !error && (
        <>
          <div
            className="rounded-xl px-4 py-3 mb-6 text-sm"
            style={{
              background: "rgba(124,58,237,0.08)",
              border: "1px solid rgba(124,58,237,0.2)",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            No live listings found on the marketplace contract. Showing demo NFTs below. List an NFT on the Arc Testnet marketplace to see it appear here.
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {nfts.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
