import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, Layers, ChevronRight } from 'lucide-react';
import { nfts, collections } from '@/lib/data';
import NFTCard from '@/components/NFTCard';

const stats = [
  { label: 'Total Volume', value: '48,291 ETH', icon: TrendingUp },
  { label: 'NFTs Created', value: '230,000+', icon: Layers },
  { label: 'Artists', value: '12,400+', icon: Users },
];

export default function HomePage() {
  const featured = nfts.slice(0, 4);
  const topCollections = collections.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative hero-grid min-h-[90vh] flex items-center overflow-hidden">
        {/* Background blobs */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.18) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute right-0 top-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
              style={{
                background: 'rgba(124,58,237,0.15)',
                border: '1px solid rgba(124,58,237,0.3)',
                color: '#a78bfa',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: '#7c3aed' }}
              />
              The future of digital ownership
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              <span className="text-white">Discover &amp;</span>
              <br />
              <span className="gradient-text">Collect</span>
              <br />
              <span className="text-white">Extraordinary</span>
              <br />
              <span className="text-white">NFTs</span>
            </h1>

            <p className="text-lg mb-10 max-w-md" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Arc is the premier marketplace for digital art, collectibles, and virtual experiences. Own a piece of the future.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
              >
                Explore NFTs <ArrowRight size={18} />
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                View Collections
              </Link>
            </div>
          </div>

          {/* Right — floating NFT cards */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {nfts.slice(0, 4).map((nft, i) => (
              <Link
                key={nft.id}
                href={`/nft/${nft.id}`}
                className="rounded-2xl overflow-hidden card-hover"
                style={{
                  background: '#0d0d1e',
                  border: '1px solid rgba(255,255,255,0.07)',
                  animationDelay: `${i * 0.3}s`,
                  transform: i % 2 === 1 ? 'translateY(24px)' : 'translateY(0)',
                }}
              >
                <div className="relative aspect-square">
                  <Image src={nft.image} alt={nft.name} fill className="object-cover" sizes="200px" />
                </div>
                <div className="px-3 py-2">
                  <p className="text-xs font-semibold text-white truncate">{nft.name}</p>
                  <p className="text-xs" style={{ color: '#7c3aed' }}>
                    {nft.price} ETH
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: '#0d0d1e' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(124,58,237,0.15)' }}
                >
                  <stat.icon size={22} style={{ color: '#7c3aed' }} />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured NFTs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Featured NFTs</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)' }}>Handpicked by our curators</p>
          </div>
          <Link
            href="/explore"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold"
            style={{ color: '#a78bfa' }}
          >
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>
      </section>

      {/* Top Collections */}
      <section style={{ background: '#08081a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Top Collections</h2>
              <p style={{ color: 'rgba(255,255,255,0.4)' }}>The most coveted collections on Arc</p>
            </div>
            <Link
              href="/collections"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold"
              style={{ color: '#a78bfa' }}
            >
              All Collections <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {topCollections.map((col, i) => (
              <Link
                key={col.id}
                href="/collections"
                className="rounded-2xl overflow-hidden card-hover"
                style={{ background: '#0d0d1e', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {/* Banner */}
                <div className="relative h-28 overflow-hidden">
                  <Image src={col.banner} alt={col.name} fill className="object-cover" sizes="400px" />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, transparent, rgba(13,13,30,0.8))' }}
                  />
                  <div
                    className="absolute top-3 left-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: 'rgba(0,0,0,0.6)' }}
                  >
                    {i + 1}
                  </div>
                </div>

                {/* Creator avatar */}
                <div className="px-4 -mt-5 mb-3">
                  <div
                    className="w-12 h-12 rounded-xl overflow-hidden"
                    style={{ border: '2px solid #0d0d1e' }}
                  >
                    <Image src={col.image} alt={col.name} width={48} height={48} className="object-cover" />
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <div className="flex items-center gap-1 mb-1">
                    <h3 className="font-semibold text-white text-sm">{col.name}</h3>
                    {col.verified && (
                      <span style={{ color: '#06b6d4' }} className="text-xs">✓</span>
                    )}
                  </div>
                  <div className="flex justify-between text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    <span>Floor: <strong className="text-white">{col.floorPrice} ETH</strong></span>
                    <span>Vol: <strong className="text-white">{col.totalVolume} ETH</strong></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">How Arc Works</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)' }}>
            Three steps to owning extraordinary digital art
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Connect Your Wallet',
              desc: 'Link your crypto wallet to Arc in seconds. We support MetaMask, Phantom, and more.',
            },
            {
              step: '02',
              title: 'Explore &amp; Discover',
              desc: 'Browse thousands of curated NFTs across art, photography, generative, and abstract categories.',
            },
            {
              step: '03',
              title: 'Collect &amp; Trade',
              desc: 'Buy NFTs instantly or place bids. List your own collection and earn from every secondary sale.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{ background: '#0d0d1e', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div
                className="text-6xl font-black mb-6 select-none"
                style={{ color: 'rgba(124,58,237,0.15)' }}
              >
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-white mb-3"
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div
          className="rounded-3xl p-12 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(6,182,212,0.15))' ,
            border: '1px solid rgba(124,58,237,0.3)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.12) 0%, transparent 70%)',
            }}
          />
          <h2 className="text-3xl font-bold text-white mb-4 relative">
            Ready to start collecting?
          </h2>
          <p className="mb-8 relative" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Join over 12,000 artists and collectors already on Arc.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white relative transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
          >
            Start Exploring <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
