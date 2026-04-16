import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Heart, Eye, ExternalLink, ArrowLeft, CheckCircle2, Tag } from 'lucide-react';
import { nfts, getNFTById, getNFTsByCollection, formatNumber } from '@/lib/data';
import NFTCard from '@/components/NFTCard';

export function generateStaticParams() {
  return nfts.map((n) => ({ id: n.id }));
}

export default async function NFTDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const nft = getNFTById(id);
  if (!nft) notFound();

  const related = getNFTsByCollection(nft.collectionId)
    .filter((n) => n.id !== nft.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back */}
      <Link
        href="/explore"
        className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
        style={{ color: 'rgba(255,255,255,0.45)' }}
      >
        <ArrowLeft size={16} />
        Back to Explore
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left — Image */}
        <div>
          <div
            className="relative rounded-3xl overflow-hidden aspect-square"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <Image
              src={nft.image}
              alt={nft.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 600px"
              priority
            />
          </div>

          {/* Stats row */}
          <div
            className="flex items-center gap-6 mt-4 px-4 py-3 rounded-xl"
            style={{ background: '#0d0d1e', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <span
              className="flex items-center gap-2 text-sm"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              <Heart size={15} /> {formatNumber(nft.likes)} likes
            </span>
            <span
              className="flex items-center gap-2 text-sm"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              <Eye size={15} /> {formatNumber(nft.views)} views
            </span>
            <span
              className="ml-auto px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
              style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa' }}
            >
              {nft.category}
            </span>
          </div>
        </div>

        {/* Right — Details */}
        <div>
          {/* Collection */}
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm font-medium" style={{ color: '#06b6d4' }}>
              {nft.collectionName}
            </p>
            <CheckCircle2 size={14} style={{ color: '#06b6d4' }} />
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">{nft.name}</h1>
          <p className="mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {nft.description}
          </p>

          {/* Creator + Owner */}
          <div
            className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-2xl"
            style={{ background: '#0d0d1e', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            {[
              { label: 'Creator', user: nft.creator },
              { label: 'Owner', user: nft.owner },
            ].map(({ label, user }) => (
              <div key={label}>
                <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {label}
                </p>
                <div className="flex items-center gap-2">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-semibold text-white">{user.name}</p>
                      {user.verified && <CheckCircle2 size={12} style={{ color: '#06b6d4' }} />}
                    </div>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      @{user.username}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Price + Buy */}
          <div
            className="rounded-2xl p-5 mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.08))',
              border: '1px solid rgba(124,58,237,0.25)',
            }}
          >
            {nft.listed ? (
              <>
                <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Current Price
                </p>
                <p className="text-4xl font-black text-white mb-4">
                  {nft.price}{' '}
                  <span className="text-2xl" style={{ color: '#7c3aed' }}>
                    ETH
                  </span>
                </p>
                <div className="flex gap-3">
                  <button
                    className="flex-1 py-3 rounded-xl font-semibold text-white transition-all hover:scale-[1.02]"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
                  >
                    Buy Now
                  </button>
                  <button
                    className="flex-1 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02]"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.8)',
                    }}
                  >
                    Place Bid
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Tag size={18} style={{ color: 'rgba(255,255,255,0.4)' }} />
                <div>
                  <p className="text-sm font-semibold text-white">Not Listed</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Last sale: {nft.price} ETH
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Attributes */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Attributes</h3>
            <div className="grid grid-cols-2 gap-2">
              {nft.attributes.map((attr) => (
                <div
                  key={attr.trait_type}
                  className="rounded-xl px-3 py-2.5 text-center"
                  style={{
                    background: 'rgba(124,58,237,0.08)',
                    border: '1px solid rgba(124,58,237,0.2)',
                  }}
                >
                  <p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {attr.trait_type}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: '#a78bfa' }}>
                    {attr.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Token info */}
          <div
            className="mt-4 flex items-center justify-between px-4 py-3 rounded-xl text-xs"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            <span>Token ID: #{nft.id.padStart(4, '0')}</span>
            <span>Created {nft.createdAt}</span>
            <a href="#" className="flex items-center gap-1 hover:text-white transition-colors">
              View on Chain <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">More from {nft.collectionName}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((n) => (
              <NFTCard key={n.id} nft={n} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
