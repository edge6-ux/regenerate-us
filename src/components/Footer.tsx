import Link from 'next/link';
import UsFlag from '@/components/UsFlag';

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-lg font-bold text-white">
                Regen USA
              </span>
              <UsFlag />
            </div>
            <p className="text-sm text-slate-200/70">
              Verifying regenerative farms and connecting them with the farm-to-table
              restaurants that source from them.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-400 mb-3 text-xs uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/apply" className="text-sm text-slate-200/80 hover:text-white transition-colors">
                  Apply to Join
                </Link>
              </li>
              <li>
                <Link href="/directory" className="text-sm text-slate-200/80 hover:text-white transition-colors">
                  Directory
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
            <h3 className="font-semibold text-slate-400 mb-3 text-xs uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/soil-credits" className="text-sm text-slate-200/80 hover:text-white transition-colors">
                  Soil Credits
                </Link>
              </li>
              <li>
                <Link href="/oz-education" className="text-sm text-slate-200/80 hover:text-white transition-colors">
                  Opportunity Zone Education
                </Link>
              </li>
              <li>
                <Link href="/conservation-grants" className="text-sm text-slate-200/80 hover:text-white transition-colors">
                  Conservation Easements &amp; Grants
                </Link>
              </li>
              <li>
                <Link href="/regenerative-resources" className="text-sm text-slate-200/80 hover:text-white transition-colors">
                  Regenerative Resources
                </Link>
              </li>
              <li>
                <Link href="/general-resources" className="text-sm text-slate-200/80 hover:text-white transition-colors">
                  General Resources
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-400 mb-3 text-xs uppercase tracking-wider">Contact</h3>
            <p className="text-sm text-slate-200/70">
              Questions about Regen USA?<br />
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
