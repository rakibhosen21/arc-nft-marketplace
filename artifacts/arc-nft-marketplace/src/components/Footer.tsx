'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#05050f' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
              >
                <Zap size={16} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">Arc</span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
              The premier marketplace for extraordinary digital art and collectibles.
            </p>
          </div>

          {/* Links */}
          {[
            {
              title: 'Marketplace',
              links: [
                { href: '/explore', label: 'Explore NFTs' },
                { href: '/collections', label: 'Collections' },
                { href: '/profile', label: 'My Profile' },
              ],
            },
            {
              title: 'Resources',
              links: [
                { href: '#', label: 'Help Center' },
                { href: '#', label: 'Creator Guide' },
                { href: '#', label: 'Blog' },
              ],
            },
            {
              title: 'Company',
              links: [
                { href: '#', label: 'About' },
                { href: '#', label: 'Careers' },
                { href: '#', label: 'Press' },
              ],
            },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{ color: 'rgba(255,255,255,0.4)' }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.8)')
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.4)')
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © 2026 Arc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Cookie Policy'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
