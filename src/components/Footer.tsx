import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1b4332] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-3">
              <span className="text-lg font-bold text-white">
                Regenerate US
              </span>
            </div>
            <p className="text-sm text-green-200/70">
              Certifying restaurants that prioritize local, sustainable sourcing
              from verified farms and producers.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-green-400 mb-3 text-xs uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/apply" className="text-sm text-green-200/80 hover:text-white transition-colors">
                  Apply for Certification
                </Link>
              </li>
              <li>
                <Link href="/directory" className="text-sm text-green-200/80 hover:text-white transition-colors">
                  Certified Restaurants
                </Link>
              </li>
              <li>
                <Link href="/about-certification" className="text-sm text-green-200/80 hover:text-white transition-colors">
                  How it Works
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-green-400 mb-3 text-xs uppercase tracking-wider">Contact</h3>
            <p className="text-sm text-green-200/70">
              Questions about the certification program?<br />
              <a href="mailto:info@regenerateus.com" className="text-green-300 hover:text-white transition-colors hover:underline">
                info@regenerateus.com
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-[#2d6a4f] mt-8 pt-6 text-center">
          <p className="text-xs text-green-200/40">
            © {new Date().getFullYear()} Regenerate US. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
