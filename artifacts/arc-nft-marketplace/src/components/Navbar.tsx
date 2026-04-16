'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { ConnectButton } from "thirdweb/react";
import { client, arcTestnet } from "@/lib/thirdweb";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(5, 5, 15, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
            >
              <Zap size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Arc</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: '/explore', label: 'Explore' },
              { href: '/collections', label: 'Collections' },
              { href: '/profile', label: 'Profile' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ConnectButton + Mobile toggle */}
          <div className="flex items-center gap-3">
            <ConnectButton
              client={client}
              chain={arcTestnet}
              connectButton={{
                label: "Connect Wallet",
                style: {
                  background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  borderRadius: "12px",
                  padding: "8px 16px",
                  border: "none",
                  cursor: "pointer",
                },
              }}
              detailsButton={{
                style: {
                  background: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.35)",
                  borderRadius: "12px",
                  color: "#a78bfa",
                  fontWeight: "600",
                  fontSize: "14px",
                },
              }}
            />
            <button
              className="md:hidden p-2 rounded-lg text-white"
              style={{ background: 'rgba(255,255,255,0.06)' }}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-4 pb-4 space-y-1"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {[
            { href: '/explore', label: 'Explore' },
            { href: '/collections', label: 'Collections' },
            { href: '/profile', label: 'Profile' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-3 rounded-lg text-sm font-medium"
              style={{ color: 'rgba(255,255,255,0.7)' }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
