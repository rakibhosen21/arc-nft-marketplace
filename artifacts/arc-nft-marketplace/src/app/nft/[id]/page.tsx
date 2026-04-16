'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Tag } from 'lucide-react';
import { useReadContract } from 'thirdweb/react';
import { getListing } from 'thirdweb/extensions/marketplace';
import { MediaRenderer } from 'thirdweb/react';
import {
  client,
  marketplaceContract,
  formatUSDC,
  resolveIpfsUrl,
} from '@/lib/thirdweb';
import BuyButton from '@/components/BuyButton';
import { getNFTById, formatNumber } from '@/lib/data';
import NFTCard from '@/components/NFTCard';
import { nfts } from '@/lib/data';

function RealListingDetail({ listingId }: { listingId: bigint }) {
  const { data: listing, isLoading, error } = useReadContract(getListing, {
    contract: marketplaceContract,
    listingId,
  });

  if (isLoading) {
    return (
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="rounded-3xl aspect-square animate-pulse" style={{ background: '#0d0d1e' }} />
        <div className="space-y-4 pt-4">
          <div className="h-6 rounded w-1/3 animate-pulse" style={{ background: '#0d0d1e' }} />
          <div className="h-10 rounded w-2/3 animate-pulse" style={{ background: '#0d0d1e' }} />
          <div className="h-24 rounded animate-pulse" style={{ background: '#0d0d1e' }} />
          <div className="h-16 rounded animate-pulse" style={{ background: '#0d0d1e' }} />
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="text-center py-24">
        <p className="text-lg mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Listing not found
        </p>
        <Link href="/explore" className="text-sm" style={{ color: '#a78bfa' }}>
          Back to Explore
        </Link>
      </div>
    );
  }

  const metadata = listing.asset?.metadata;
  const name = metadata?.name ?? `Token #${listing.tokenId}`;
  const description = (metadata?.description as string) ?? 'No description available.';
  const image = resolveIpfsUrl(metadata?.image ?? '');
  const isActive = listing.status === 1; // Active status
const isActive = String(listing.status) === "CREATED"
  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Left — Image */}
      <div>
        <div
          className="relative rounded-3xl overflow-hidden aspect-square"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {image ? (
            <MediaRenderer
              client={client}
              src={image}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: 'rgba(124,58,237,0.1)' }}
            >
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 64 }}>?</span>
            </div>
          )}
        </div>

        <div
          className="flex items-center gap-4 mt-4 px-4 py-3 rounded-xl text-sm"
          style={{ background: '#0d0d1e', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>
            Token ID: <strong className="text-white">#{String(listing.tokenId)}</strong>
          </span>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>
            Listing: <strong className="text-white">#{String(listing.id)}</strong>
          </span>
          <span
            className="ml-auto px-2.5 py-1 rounded-full text-xs font-semibold"
            style={
              isActive
                ? { background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }
                : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }
            }
          >
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      {/* Right — Details */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <p className="text-sm font-medium" style={{ color: '#06b6d4' }}>
            Arc NFT Collection
          </p>
          <CheckCircle2 size={14} style={{ color: '#06b6d4' }} />
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">{name}</h1>

        <p className="mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
          {description}
        </p>

        {/* Seller */}
        <div
          className="mb-6 p-4 rounded-2xl"
          style={{ background: '#0d0d1e', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>Seller</p>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', color: '#fff' }}
            >
              {listing.creatorAddress.slice(2, 4).toUpperCase()}
            </div>
            <p className="text-sm font-mono text-white">
              {listing.creatorAddress.slice(0, 6)}...{listing.creatorAddress.slice(-4)}
            </p>
          </div>
        </div>

        {/* Price + Buy */}
        <div
          className="rounded-2xl p-5 mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.08))',
            border: '1px solid rgba(124,58,237,0.25)',
          }}
        >
          {isActive ? (
            <>
              <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Price
              </p>
              <p className="text-4xl font-black text-white mb-5">
                {formatUSDC(listing.pricePerToken)}{' '}
                <span className="text-2xl" style={{ color: '#7c3aed' }}>
                  USDC
                </span>
              </p>
              <BuyButton
                listingId={listing.id}
                pricePerToken={listing.pricePerToken}
              />
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Tag size={18} style={{ color: 'rgba(255,255,255,0.4)' }} />
              <div>
                <p className="text-sm font-semibold text-white">Not Active</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Last price: {formatUSDC(listing.pricePerToken)} USDC
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Contract info */}
        <div
          className="px-4 py-3 rounded-xl text-xs"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          <div className="flex items-center justify-between mb-1">
            <span>NFT Contract</span>
            <span className="font-mono">
              {listing.assetContractAddress.slice(0, 8)}...{listing.assetContractAddress.slice(-6)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Network</span>
            <span>Arc Testnet (Chain ID 5042002)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockNFTDetail({ id }: { id: string }) {
  const nft = getNFTById(id);
  const related = nfts.filter((n) => n.collectionId === nft?.collectionId && n.id !== id).slice(0, 4);

  if (!nft) {
    return (
      <div className="text-center py-24">
        <p className="text-lg mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>NFT not found</p>
        <Link href="/explore" className="text-sm" style={{ color: '#a78bfa' }}>
          Browse NFTs
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <div
            className="relative rounded-3xl overflow-hidden aspect-square"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <Image src={nft.image} alt={nft.name} fill className="object-cover" sizes="600px" priority />
          </div>
          <div
            className="flex items-center gap-4 mt-4 px-4 py-3 rounded-xl text-sm"
            style={{ background: '#0d0d1e', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>
              {formatNumber(nft.likes)} likes · {formatNumber(nft.views)} views
            </span>
            <span
              className="ml-auto px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
              style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa' }}
            >
              {nft.category}
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-3" style={{ color: '#06b6d4' }}>
            {nft.collectionName}
          </p>
          <h1 className="text-3xl font-bold text-white mb-4">{nft.name}</h1>
          <p className="mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {nft.description}
          </p>

          <div
            className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-2xl"
            style={{ background: '#0d0d1e', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            {[
              { label: 'Creator', user: nft.creator },
              { label: 'Owner', user: nft.owner },
            ].map(({ label, user }) => (
              <div key={label}>
                <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
                <div className="flex items-center gap-2">
                  <Image src={user.avatar} alt={user.name} width={32} height={32} className="rounded-full" />
                  <div>
                    <p className="text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>@{user.username}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="rounded-2xl p-5 mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.08))',
              border: '1px solid rgba(124,58,237,0.25)',
            }}
          >
            <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.45)' }}>Demo Price</p>
            <p className="text-3xl font-black text-white mb-4">
              {nft.price} <span className="text-xl" style={{ color: '#7c3aed' }}>ETH</span>
            </p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
              This is a demo NFT. List real NFTs on the Arc Testnet marketplace to enable USDC purchases.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {nft.attributes.map((attr) => (
              <div
                key={attr.trait_type}
                className="rounded-xl px-3 py-2.5 text-center"
                style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}
              >
                <p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{attr.trait_type}</p>
                <p className="text-sm font-semibold" style={{ color: '#a78bfa' }}>{attr.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">More from {nft.collectionName}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((n) => <NFTCard key={n.id} nft={n} />)}
          </div>
        </div>
      )}
    </div>
  );
}

export default function NFTDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // If ID looks like a listing ID (numeric, could be large), try real listing first
  const isLikelyListingId = /^\d+$/.test(id) && parseInt(id) >= 0;
  // Mock NFT IDs are 1-12 and short; but we can try listing first for all numeric IDs

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/explore"
        className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
        style={{ color: 'rgba(255,255,255,0.45)' }}
      >
        <ArrowLeft size={16} />
        Back to Explore
      </Link>

      {isLikelyListingId ? (
        <RealListingDetail listingId={BigInt(id)} />
      ) : (
        <MockNFTDetail id={id} />
      )}
    </div>
  );
}
