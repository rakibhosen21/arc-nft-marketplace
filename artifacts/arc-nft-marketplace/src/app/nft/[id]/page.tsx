'use client';

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

/* ---------------- REAL LISTING ---------------- */

function RealListingDetail({ listingId }: { listingId: bigint }) {
  const { data: listing, isLoading, error } = useReadContract(getListing, {
    contract: marketplaceContract,
    listingId,
  });

  if (isLoading) return <p className="text-white">Loading...</p>;

  if (error || !listing) {
    return (
      <div className="text-center py-24 text-white">
        Listing not found
      </div>
    );
  }

  const metadata = listing?.asset?.metadata;
  const name = metadata?.name ?? `Token #${listing.tokenId}`;
  const description =
    (metadata?.description as string) ?? 'No description available.';
  const image = resolveIpfsUrl(metadata?.image ?? '');

  // ✅ better active check
  const isActive = listing?.status === 'ACTIVE';

  return (
    <div className="grid lg:grid-cols-2 gap-12 text-white">

      {/* Image */}
      <div>
        <div className="relative rounded-3xl overflow-hidden aspect-square border">
          {image ? (
            <MediaRenderer client={client} src={image} />
          ) : (
            <div className="flex items-center justify-center h-full">No Image</div>
          )}
        </div>
      </div>

      {/* Info */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        <p className="mb-6 text-gray-400">{description}</p>

        {/* Seller */}
        <p className="mb-2 text-sm text-gray-400">Seller</p>
        <p className="mb-6 font-mono">
          {listing?.creatorAddress?.slice(0, 6)}...
          {listing?.creatorAddress?.slice(-4)}
        </p>

        {/* Price */}
        {isActive ? (
          <>
            <p className="text-2xl mb-4">
              {formatUSDC(listing.pricePerToken)} USDC
            </p>

            <BuyButton
              listingId={listing.id}
              pricePerToken={listing.pricePerToken}
            />
          </>
        ) : (
          <p className="text-gray-400">Not Active</p>
        )}
      </div>
    </div>
  );
}

/* ---------------- MOCK ---------------- */

function MockNFTDetail({ id }: { id: string }) {
  const nft = getNFTById(id);

  if (!nft) return <p className="text-white">NFT not found</p>;

  const related = nfts
    .filter((n) => n.collectionId === nft.collectionId && n.id !== id)
    .slice(0, 4);

  return (
    <div className="text-white">
      <h1 className="text-3xl mb-4">{nft.name}</h1>

      <Image src={nft.image} alt={nft.name} width={400} height={400} />

      <p className="mt-4 text-gray-400">{nft.description}</p>

      <p className="mt-4">{nft.price} ETH</p>

      <div className="grid grid-cols-2 gap-2 mt-6">
        {nft.attributes.map((attr) => (
          <div key={attr.trait_type}>
            {attr.trait_type}: {attr.value}
          </div>
        ))}
      </div>

      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl mb-4">More</h2>
          {related.map((n) => (
            <NFTCard key={n.id} nft={n} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- MAIN PAGE ---------------- */

export default function NFTDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const isNumber = /^\d+$/.test(id);

  return (
    <div className="p-6 text-white">
      <Link href="/explore" className="flex gap-2 mb-6">
        <ArrowLeft size={16} /> Back
      </Link>

      {isNumber ? (
        <RealListingDetail listingId={BigInt(id)} />
      ) : (
        <MockNFTDetail id={id} />
      )}
    </div>
  );
}