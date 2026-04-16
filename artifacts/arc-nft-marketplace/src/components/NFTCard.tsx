import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye } from 'lucide-react';
import type { NFT } from '@/lib/data';
import { formatNumber } from '@/lib/data';

export default function NFTCard({ nft }: { nft: NFT }) {
  return (
    <Link href={`/nft/${nft.id}`} className="block card-hover">
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: '#0d0d1e',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={nft.image}
            alt={nft.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {!nft.listed && (
            <div
              className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(0,0,0,0.7)', color: 'rgba(255,255,255,0.6)' }}
            >
              Not Listed
            </div>
          )}
          <div
            className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold capitalize"
            style={{ background: 'rgba(124,58,237,0.85)', color: '#fff' }}
          >
            {nft.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Collection + Creator */}
          <div className="flex items-center gap-2 mb-2">
            <Image
              src={nft.creator.avatar}
              alt={nft.creator.name}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {nft.collectionName}
            </span>
            {nft.creator.verified && (
              <span
                className="text-xs px-1.5 py-0.5 rounded-full"
                style={{ background: 'rgba(6,182,212,0.2)', color: '#06b6d4' }}
              >
                ✓
              </span>
            )}
          </div>

          <h3 className="font-semibold text-white text-sm mb-3 truncate">{nft.name}</h3>

          {/* Price + Stats */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {nft.listed ? 'Price' : 'Last Sale'}
              </p>
              <p className="font-bold text-white">
                {nft.price}{' '}
                <span style={{ color: '#7c3aed' }}>{nft.currency}</span>
              </p>
            </div>
            <div className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <span className="flex items-center gap-1 text-xs">
                <Heart size={13} /> {formatNumber(nft.likes)}
              </span>
              <span className="flex items-center gap-1 text-xs">
                <Eye size={13} /> {formatNumber(nft.views)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
