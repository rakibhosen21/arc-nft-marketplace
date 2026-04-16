import Image from 'next/image';
import { CheckCircle2, Twitter, Globe, Copy } from 'lucide-react';
import { users, nfts, formatNumber } from '@/lib/data';
import NFTCard from '@/components/NFTCard';

export default function ProfilePage() {
  const user = users[0];
  const created = nfts.filter((n) => n.creator.id === user.id);
  const owned = nfts.filter((n) => n.owner.id === user.id);

  return (
    <div>
      {/* Banner */}
      <div
        className="relative h-56 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.4) 0%, rgba(6,182,212,0.3) 50%, rgba(236,72,153,0.3) 100%)',
        }}
      >
        <div
          className="absolute inset-0 hero-grid"
          style={{ opacity: 0.5 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Avatar + name */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 -mt-14 mb-8">
          <div
            className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0"
            style={{ border: '4px solid #05050f' }}
          >
            <Image
              src={user.avatar}
              alt={user.name}
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              {user.verified && (
                <CheckCircle2 size={18} style={{ color: '#06b6d4' }} />
              )}
            </div>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              @{user.username}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
            >
              <Twitter size={14} /> Follow
            </button>
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
            >
              <Globe size={14} /> Website
            </button>
          </div>
        </div>

        {/* Bio + stats */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <p className="leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {user.bio}
            </p>
            <div
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg w-fit"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)' }}
            >
              <span className="font-mono">0x4f2a...8c1b</span>
              <button className="hover:text-white transition-colors">
                <Copy size={13} />
              </button>
            </div>
          </div>

          <div
            className="rounded-2xl p-5 grid grid-cols-2 gap-4"
            style={{ background: '#0d0d1e', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            {[
              { label: 'Followers', value: formatNumber(user.followers) },
              { label: 'Following', value: formatNumber(user.following) },
              { label: 'Created', value: created.length.toString() },
              { label: 'Volume', value: `${user.totalVolume} ETH` },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-2">
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs — simple sections */}
        <div>
          {/* Created */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-white">Created</h2>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(124,58,237,0.2)', color: '#a78bfa' }}
              >
                {created.length}
              </span>
            </div>
            {created.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {created.map((nft) => (
                  <NFTCard key={nft.id} nft={nft} />
                ))}
              </div>
            ) : (
              <div
                className="rounded-2xl py-16 text-center"
                style={{ background: '#0d0d1e', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <p style={{ color: 'rgba(255,255,255,0.3)' }}>No NFTs created yet</p>
              </div>
            )}
          </div>

          {/* Owned */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-white">Owned</h2>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}
              >
                {owned.length}
              </span>
            </div>
            {owned.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {owned.map((nft) => (
                  <NFTCard key={nft.id} nft={nft} />
                ))}
              </div>
            ) : (
              <div
                className="rounded-2xl py-16 text-center"
                style={{ background: '#0d0d1e', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <p style={{ color: 'rgba(255,255,255,0.3)' }}>No NFTs owned</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
