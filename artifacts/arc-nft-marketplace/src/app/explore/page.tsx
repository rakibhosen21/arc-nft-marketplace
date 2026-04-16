'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { nfts } from '@/lib/data';
import NFTCard from '@/components/NFTCard';

const CATEGORIES = ['All', 'Art', 'Photography', 'Generative', 'Abstract'];
const SORT_OPTIONS = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Most Liked', value: 'likes' },
  { label: 'Most Viewed', value: 'views' },
  { label: 'Newest', value: 'newest' },
];

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('price-asc');
  const [listedOnly, setListedOnly] = useState(false);

  const filtered = useMemo(() => {
    let result = [...nfts];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (n) =>
          n.name.toLowerCase().includes(q) ||
          n.collectionName.toLowerCase().includes(q) ||
          n.creator.name.toLowerCase().includes(q)
      );
    }
    if (category !== 'All') result = result.filter((n) => n.category === category);
    if (listedOnly) result = result.filter((n) => n.listed);
    result.sort((a, b) => {
      if (sort === 'price-asc') return parseFloat(a.price) - parseFloat(b.price);
      if (sort === 'price-desc') return parseFloat(b.price) - parseFloat(a.price);
      if (sort === 'likes') return b.likes - a.likes;
      if (sort === 'views') return b.views - a.views;
      if (sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0;
    });
    return result;
  }, [search, category, sort, listedOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">Explore NFTs</h1>
        <p style={{ color: 'rgba(255,255,255,0.45)' }}>
          Discover {nfts.length} extraordinary digital artworks
        </p>
      </div>

      {/* Filters */}
      <div
        className="rounded-2xl p-5 mb-8 flex flex-col lg:flex-row gap-4"
        style={{ background: '#0d0d1e', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          />
          <input
            type="text"
            placeholder="Search NFTs, collections, creators..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:ring-1"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          />
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
              style={
                category === cat
                  ? { background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', color: '#fff' }
                  : {
                      background: 'rgba(255,255,255,0.05)',
                      color: 'rgba(255,255,255,0.5)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort + Listed */}
        <div className="flex items-center gap-3">
          <SlidersHorizontal size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm py-2.5 px-3 rounded-xl outline-none"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} style={{ background: '#0d0d1e' }}>
                {o.label}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <input
              type="checkbox"
              checked={listedOnly}
              onChange={(e) => setListedOnly(e.target.checked)}
              className="rounded"
              style={{ accentColor: '#7c3aed' }}
            />
            Listed
          </label>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.35)' }}>
        Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="text-2xl mb-2" style={{ color: 'rgba(255,255,255,0.2)' }}>
            No NFTs found
          </p>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
