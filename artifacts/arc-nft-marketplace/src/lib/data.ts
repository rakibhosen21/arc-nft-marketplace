export type User = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  bio: string;
  followers: number;
  following: number;
  totalVolume: string;
};

export type Collection = {
  id: string;
  name: string;
  description: string;
  image: string;
  banner: string;
  creator: User;
  itemCount: number;
  floorPrice: string;
  totalVolume: string;
  verified: boolean;
  category: string;
};

export type NFT = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  currency: 'ETH';
  creator: User;
  owner: User;
  collectionId: string;
  collectionName: string;
  likes: number;
  views: number;
  category: string;
  listed: boolean;
  createdAt: string;
  attributes: { trait_type: string; value: string }[];
};

export const users: User[] = [
  {
    id: 'u1',
    name: 'Nara Chen',
    username: 'naraverse',
    avatar: 'https://picsum.photos/seed/u1/200/200',
    verified: true,
    bio: 'Digital painter exploring the liminal space between reality and imagination.',
    followers: 12400,
    following: 321,
    totalVolume: '892.4',
  },
  {
    id: 'u2',
    name: 'Milo Voss',
    username: 'milogen',
    avatar: 'https://picsum.photos/seed/u2/200/200',
    verified: true,
    bio: 'Generative artist. Every algorithm is a brushstroke.',
    followers: 8760,
    following: 140,
    totalVolume: '1204.7',
  },
  {
    id: 'u3',
    name: 'Sora Tanaka',
    username: 'soracraft',
    avatar: 'https://picsum.photos/seed/u3/200/200',
    verified: false,
    bio: 'Photographer turned NFT creator. Light is my medium.',
    followers: 4200,
    following: 890,
    totalVolume: '312.9',
  },
  {
    id: 'u4',
    name: 'Elara Moon',
    username: 'elaramoon',
    avatar: 'https://picsum.photos/seed/u4/200/200',
    verified: true,
    bio: 'Sculpting impossible worlds one pixel at a time.',
    followers: 21000,
    following: 204,
    totalVolume: '3120.5',
  },
  {
    id: 'u5',
    name: 'Ryx Dario',
    username: 'ryxdario',
    avatar: 'https://picsum.photos/seed/u5/200/200',
    verified: false,
    bio: 'Abstract expressionist living in the blockchain.',
    followers: 3100,
    following: 650,
    totalVolume: '189.2',
  },
];

export const collections: Collection[] = [
  {
    id: 'c1',
    name: 'Neon Dreamscapes',
    description: 'A series of vivid, luminescent dreamscapes at the boundary of the digital and the surreal.',
    image: 'https://picsum.photos/seed/col1/500/500',
    banner: 'https://picsum.photos/seed/colb1/1200/400',
    creator: users[0],
    itemCount: 42,
    floorPrice: '2.4',
    totalVolume: '380.1',
    verified: true,
    category: 'Art',
  },
  {
    id: 'c2',
    name: 'Algo Genesis',
    description: 'Purely algorithmic art, where randomness meets mathematical beauty.',
    image: 'https://picsum.photos/seed/col2/500/500',
    banner: 'https://picsum.photos/seed/colb2/1200/400',
    creator: users[1],
    itemCount: 100,
    floorPrice: '1.8',
    totalVolume: '724.5',
    verified: true,
    category: 'Generative',
  },
  {
    id: 'c3',
    name: 'Void Portraits',
    description: 'Faces from the void — distorted, beautiful, and hauntingly familiar.',
    image: 'https://picsum.photos/seed/col3/500/500',
    banner: 'https://picsum.photos/seed/colb3/1200/400',
    creator: users[3],
    itemCount: 24,
    floorPrice: '4.2',
    totalVolume: '1024.8',
    verified: true,
    category: 'Photography',
  },
  {
    id: 'c4',
    name: 'Solstice Fragments',
    description: 'Abstract shards of light captured at the moment of solstice, never to repeat.',
    image: 'https://picsum.photos/seed/col4/500/500',
    banner: 'https://picsum.photos/seed/colb4/1200/400',
    creator: users[2],
    itemCount: 18,
    floorPrice: '0.9',
    totalVolume: '156.3',
    verified: false,
    category: 'Abstract',
  },
  {
    id: 'c5',
    name: 'Chrome Myths',
    description: 'Ancient myths reborn in chrome and neon. Heroes, gods, and monsters for the digital age.',
    image: 'https://picsum.photos/seed/col5/500/500',
    banner: 'https://picsum.photos/seed/colb5/1200/400',
    creator: users[4],
    itemCount: 33,
    floorPrice: '0.6',
    totalVolume: '98.7',
    verified: false,
    category: 'Art',
  },
  {
    id: 'c6',
    name: 'Hyperflux',
    description: 'Motion captured at 1/10000th of a second. The art of pure kinetic energy.',
    image: 'https://picsum.photos/seed/col6/500/500',
    banner: 'https://picsum.photos/seed/colb6/1200/400',
    creator: users[1],
    itemCount: 56,
    floorPrice: '3.1',
    totalVolume: '841.2',
    verified: true,
    category: 'Photography',
  },
];

export const nfts: NFT[] = [
  {
    id: '1',
    name: 'Neon Void #001',
    description: 'The first piece in the Neon Dreamscapes series. A portal into a world where light has weight and darkness breathes.',
    image: 'https://picsum.photos/seed/nft1/600/600',
    price: '3.2',
    currency: 'ETH',
    creator: users[0],
    owner: users[0],
    collectionId: 'c1',
    collectionName: 'Neon Dreamscapes',
    likes: 284,
    views: 4120,
    category: 'Art',
    listed: true,
    createdAt: '2025-12-01',
    attributes: [
      { trait_type: 'Background', value: 'Deep Void' },
      { trait_type: 'Luminosity', value: 'Hypercharged' },
      { trait_type: 'Hue Shift', value: 'Violet' },
      { trait_type: 'Rarity', value: 'Legendary' },
    ],
  },
  {
    id: '2',
    name: 'Genesis #012',
    description: 'Algo Genesis #012 — a unique crystalline formation produced by 3,000 iterations of the generative seed.',
    image: 'https://picsum.photos/seed/nft2/600/600',
    price: '1.9',
    currency: 'ETH',
    creator: users[1],
    owner: users[3],
    collectionId: 'c2',
    collectionName: 'Algo Genesis',
    likes: 132,
    views: 2300,
    category: 'Generative',
    listed: true,
    createdAt: '2025-11-15',
    attributes: [
      { trait_type: 'Algorithm', value: 'Crystal Fractal' },
      { trait_type: 'Palette', value: 'Midnight Blue' },
      { trait_type: 'Complexity', value: 'Ultra' },
      { trait_type: 'Rarity', value: 'Epic' },
    ],
  },
  {
    id: '3',
    name: 'Void Portrait IV',
    description: 'The fourth in the Void Portraits series. A face half-remembered, half-dreamed.',
    image: 'https://picsum.photos/seed/nft3/600/600',
    price: '5.5',
    currency: 'ETH',
    creator: users[3],
    owner: users[3],
    collectionId: 'c3',
    collectionName: 'Void Portraits',
    likes: 513,
    views: 8990,
    category: 'Photography',
    listed: true,
    createdAt: '2025-10-20',
    attributes: [
      { trait_type: 'Expression', value: 'Melancholy' },
      { trait_type: 'Distortion', value: 'Fractal Echo' },
      { trait_type: 'Layer Count', value: '24' },
      { trait_type: 'Rarity', value: 'Mythic' },
    ],
  },
  {
    id: '4',
    name: 'Solstice Fragment 07',
    description: 'Light at the exact moment the sun stood still. Seven shards of solstice, forever suspended.',
    image: 'https://picsum.photos/seed/nft4/600/600',
    price: '0.95',
    currency: 'ETH',
    creator: users[2],
    owner: users[2],
    collectionId: 'c4',
    collectionName: 'Solstice Fragments',
    likes: 87,
    views: 1240,
    category: 'Abstract',
    listed: true,
    createdAt: '2025-09-22',
    attributes: [
      { trait_type: 'Season', value: 'Summer' },
      { trait_type: 'Shard Count', value: '7' },
      { trait_type: 'Temperature', value: 'Golden Hour' },
      { trait_type: 'Rarity', value: 'Rare' },
    ],
  },
  {
    id: '5',
    name: 'Chrome Ares',
    description: 'The god of war, rendered in chrome and liquid light. Ancient ferocity meets digital transcendence.',
    image: 'https://picsum.photos/seed/nft5/600/600',
    price: '0.75',
    currency: 'ETH',
    creator: users[4],
    owner: users[1],
    collectionId: 'c5',
    collectionName: 'Chrome Myths',
    likes: 64,
    views: 890,
    category: 'Art',
    listed: true,
    createdAt: '2025-08-11',
    attributes: [
      { trait_type: 'Deity', value: 'Ares' },
      { trait_type: 'Material', value: 'Liquid Chrome' },
      { trait_type: 'Era', value: 'Neo-Ancient' },
      { trait_type: 'Rarity', value: 'Uncommon' },
    ],
  },
  {
    id: '6',
    name: 'Hyperflux 034',
    description: 'A 1/10000th second exposure of a water droplet impacting a mirror surface, elevated to fine art.',
    image: 'https://picsum.photos/seed/nft6/600/600',
    price: '3.8',
    currency: 'ETH',
    creator: users[1],
    owner: users[0],
    collectionId: 'c6',
    collectionName: 'Hyperflux',
    likes: 321,
    views: 5600,
    category: 'Photography',
    listed: false,
    createdAt: '2025-07-30',
    attributes: [
      { trait_type: 'Subject', value: 'Water Impact' },
      { trait_type: 'Exposure', value: '0.0001s' },
      { trait_type: 'Surface', value: 'Mirror' },
      { trait_type: 'Rarity', value: 'Epic' },
    ],
  },
  {
    id: '7',
    name: 'Neon Void #007',
    description: 'Seven layers of luminescence converging on a single vanishing point. Part two of the core Neon Void series.',
    image: 'https://picsum.photos/seed/nft7/600/600',
    price: '2.8',
    currency: 'ETH',
    creator: users[0],
    owner: users[4],
    collectionId: 'c1',
    collectionName: 'Neon Dreamscapes',
    likes: 196,
    views: 3400,
    category: 'Art',
    listed: true,
    createdAt: '2025-12-15',
    attributes: [
      { trait_type: 'Background', value: 'Prismatic Abyss' },
      { trait_type: 'Luminosity', value: 'Charged' },
      { trait_type: 'Hue Shift', value: 'Cyan' },
      { trait_type: 'Rarity', value: 'Epic' },
    ],
  },
  {
    id: '8',
    name: 'Genesis #047',
    description: 'The 47th iteration — where the algorithm discovered an unexpected symmetry no one programmed.',
    image: 'https://picsum.photos/seed/nft8/600/600',
    price: '2.1',
    currency: 'ETH',
    creator: users[1],
    owner: users[1],
    collectionId: 'c2',
    collectionName: 'Algo Genesis',
    likes: 148,
    views: 2710,
    category: 'Generative',
    listed: true,
    createdAt: '2025-11-28',
    attributes: [
      { trait_type: 'Algorithm', value: 'Symmetry Collapse' },
      { trait_type: 'Palette', value: 'Aurora' },
      { trait_type: 'Complexity', value: 'Extreme' },
      { trait_type: 'Rarity', value: 'Legendary' },
    ],
  },
  {
    id: '9',
    name: 'Void Portrait XI',
    description: 'Eleven layers deep into the void, a portrait emerges that refuses to be forgotten.',
    image: 'https://picsum.photos/seed/nft9/600/600',
    price: '6.2',
    currency: 'ETH',
    creator: users[3],
    owner: users[3],
    collectionId: 'c3',
    collectionName: 'Void Portraits',
    likes: 620,
    views: 11200,
    category: 'Photography',
    listed: true,
    createdAt: '2025-10-05',
    attributes: [
      { trait_type: 'Expression', value: 'Transcendent' },
      { trait_type: 'Distortion', value: 'Wave Echo' },
      { trait_type: 'Layer Count', value: '11' },
      { trait_type: 'Rarity', value: 'Mythic' },
    ],
  },
  {
    id: '10',
    name: 'Chrome Athena',
    description: 'Wisdom and war in liquid chrome. The goddess stands at the edge of the digital age.',
    image: 'https://picsum.photos/seed/nft10/600/600',
    price: '0.82',
    currency: 'ETH',
    creator: users[4],
    owner: users[2],
    collectionId: 'c5',
    collectionName: 'Chrome Myths',
    likes: 93,
    views: 1450,
    category: 'Art',
    listed: true,
    createdAt: '2025-08-25',
    attributes: [
      { trait_type: 'Deity', value: 'Athena' },
      { trait_type: 'Material', value: 'Polished Chrome' },
      { trait_type: 'Era', value: 'Neo-Ancient' },
      { trait_type: 'Rarity', value: 'Rare' },
    ],
  },
  {
    id: '11',
    name: 'Hyperflux 072',
    description: 'Molten glass at 2000°C, suspended in a 1/10000th second. Beauty at the edge of destruction.',
    image: 'https://picsum.photos/seed/nft11/600/600',
    price: '4.1',
    currency: 'ETH',
    creator: users[1],
    owner: users[1],
    collectionId: 'c6',
    collectionName: 'Hyperflux',
    likes: 389,
    views: 6800,
    category: 'Photography',
    listed: true,
    createdAt: '2025-07-18',
    attributes: [
      { trait_type: 'Subject', value: 'Molten Glass' },
      { trait_type: 'Exposure', value: '0.0001s' },
      { trait_type: 'Temperature', value: '2000°C' },
      { trait_type: 'Rarity', value: 'Legendary' },
    ],
  },
  {
    id: '12',
    name: 'Solstice Fragment 13',
    description: 'The thirteenth shard. Light bent through a prism on the longest day of the year.',
    image: 'https://picsum.photos/seed/nft12/600/600',
    price: '1.1',
    currency: 'ETH',
    creator: users[2],
    owner: users[4],
    collectionId: 'c4',
    collectionName: 'Solstice Fragments',
    likes: 104,
    views: 1890,
    category: 'Abstract',
    listed: true,
    createdAt: '2025-09-22',
    attributes: [
      { trait_type: 'Season', value: 'Summer' },
      { trait_type: 'Shard Count', value: '13' },
      { trait_type: 'Prism Type', value: 'Quartz Crystal' },
      { trait_type: 'Rarity', value: 'Rare' },
    ],
  },
];

export function getNFTById(id: string): NFT | undefined {
  return nfts.find((n) => n.id === id);
}

export function getCollectionById(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}

export function getNFTsByCollection(collectionId: string): NFT[] {
  return nfts.filter((n) => n.collectionId === collectionId);
}

export function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}
