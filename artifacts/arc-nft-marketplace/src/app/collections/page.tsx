import Image from 'next/image';
import { collections, getNFTsByCollection } from '@/lib/data';
import { CheckCircle2 } from 'lucide-react';

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">Collections</h1>
        <p style={{ color: 'rgba(255,255,255,0.45)' }}>
          {collections.length} curated collections from the world&apos;s top digital artists
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => {
          const items = getNFTsByCollection(col.id);
          const previewItems = items.slice(0, 3);

          return (
            <div
              key={col.id}
              className="rounded-2xl overflow-hidden card-hover"
              style={{ background: '#0d0d1e', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* Banner */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={col.banner}
                  alt={col.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(13,13,30,0.9))',
                  }}
                />
                {/* Category pill */}
                <div
                  className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(124,58,237,0.85)', color: '#fff' }}
                >
                  {col.category}
                </div>
              </div>

              {/* Collection image + info */}
              <div className="px-5 pb-5">
                <div className="flex items-end gap-4 -mt-8 mb-4">
                  <div
                    className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
                    style={{ border: '3px solid #0d0d1e' }}
                  >
                    <Image src={col.image} alt={col.name} width={64} height={64} className="object-cover" />
                  </div>
                  <div className="pb-1">
                    <div className="flex items-center gap-1.5">
                      <h2 className="text-lg font-bold text-white">{col.name}</h2>
                      {col.verified && (
                        <CheckCircle2 size={16} style={{ color: '#06b6d4' }} />
                      )}
                    </div>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      by {col.creator.name}
                    </p>
                  </div>
                </div>

                <p
                  className="text-sm leading-relaxed mb-5 line-clamp-2"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {col.description}
                </p>

                {/* Stats */}
                <div
                  className="grid grid-cols-3 gap-3 mb-5 p-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  {[
                    { label: 'Items', value: col.itemCount.toString() },
                    { label: 'Floor', value: `${col.floorPrice} ETH` },
                    { label: 'Volume', value: `${col.totalVolume} ETH` },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-sm font-bold text-white">{stat.value}</p>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Preview items */}
                {previewItems.length > 0 && (
                  <div className="flex gap-2">
                    {previewItems.map((nft) => (
                      <div key={nft.id} className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image src={nft.image} alt={nft.name} fill className="object-cover" sizes="64px" />
                      </div>
                    ))}
                    {items.length > 3 && (
                      <div
                        className="w-16 h-16 rounded-lg flex items-center justify-center text-sm font-semibold"
                        style={{
                          background: 'rgba(124,58,237,0.15)',
                          border: '1px solid rgba(124,58,237,0.3)',
                          color: '#a78bfa',
                        }}
                      >
                        +{items.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
