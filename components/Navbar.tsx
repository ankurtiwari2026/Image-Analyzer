import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm py-4 px-6 flex items-center gap-2 justify-between">
      <div className="flex items-center gap-2">
        <Sparkles className="text-blue-500 w-6 h-6" />
        <span className="text-xl font-bold tracking-tight text-gray-900">Visual Product Matcher</span>
      </div>
      <Link href="/admin" className="text-sm text-blue-600 hover:underline">Admin</Link>
    </nav>
  );
}
