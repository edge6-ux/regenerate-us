import Link from 'next/link';

export default function ComingSoonPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-xl text-center">
        <span className="inline-block bg-[#1e293b]/10 text-[#1e293b] text-xs font-semibold px-3 py-1 rounded-full mb-5 uppercase tracking-wider">
          Coming Soon
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">{title}</h1>
        <p className="text-stone-600 leading-relaxed mb-8">{description}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/directory"
            className="bg-[#1e293b] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0f172a] transition-colors text-sm"
          >
            Browse the Directory
          </Link>
          <Link
            href="/"
            className="border border-stone-300 text-stone-700 px-6 py-3 rounded-xl font-semibold hover:bg-stone-50 transition-colors text-sm"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
