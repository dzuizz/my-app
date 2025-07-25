'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import RoundedBox from './RoundedBox';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Photos', href: '/photos' },
  ];

  return (
    <nav className="p-4 pb-2">
      <RoundedBox>
        <div className="max-w-5xl mx-auto flex items-center justify-around">
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-opacity duration-200 ${pathname === item.href ? 'font-medium' : 'hover:opacity-80'
                  }`}
                style={{
                  color: pathname === item.href ? 'var(--accent-color)' : 'var(--text-color)'
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </RoundedBox>
    </nav>
  );
}
