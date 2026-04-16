import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThirdwebProviderWrapper from '@/components/ThirdwebProviderWrapper';

export const metadata: Metadata = {
  title: 'Arc — NFT Marketplace',
  description: 'Discover, collect, and sell extraordinary NFTs on Arc — the premier digital art marketplace on Arc Testnet.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ThirdwebProviderWrapper>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThirdwebProviderWrapper>
      </body>
    </html>
  );
}
