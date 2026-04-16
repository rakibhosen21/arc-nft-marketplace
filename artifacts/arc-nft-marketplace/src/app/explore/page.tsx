import ExploreListings from '@/components/ExploreListings';

export default function ExplorePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">Explore NFTs</h1>
        <p style={{ color: 'rgba(255,255,255,0.45)' }}>
          Live listings from the Arc Testnet marketplace
        </p>
      </div>
      <ExploreListings />
    </div>
  );
}
