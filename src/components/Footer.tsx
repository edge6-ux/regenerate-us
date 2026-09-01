import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-3">
              <span className="text-lg font-bold text-white">
                Regen USA
              </span>
            </div>
            <p className="text-sm text-slate-200/70">
              Certifying restaurants that prioritize local, sustainable sourcing
              from verified farms and producers.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-400 mb-3 text-xs uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/apply" className="text-sm text-slate-200/80 hover:text-white transition-colors">
                  Apply for Certification
                </Link>
              </li>
              <li>
                <Link href="/directory" className="text-sm text-slate-200/80 hover:text-white transition-colors">
                  Certified Restaurants
                </Link>
              </li>
              <li>
                <Link href="/about-certification" className="text-sm text-slate-200/80 hover:text-white transition-colors">
                  How it Works
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-400 mb-3 text-xs uppercase tracking-wider">Contact</h3>
            <p className="text-sm text-slate-200/70">
              Questions about the certification program?<br />
              <a href="mailto:info@regenusa.org" className="text-slate-300 hover:text-white transition-colors hover:underline">
                info@regenusa.org
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-[#1e293b] mt-8 pt-6 text-center">
          <p className="text-xs text-slate-200/40">
            © {new Date().getFullYear()} Regen USA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
