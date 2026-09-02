'use client';

import { useState, Suspense } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Fraunces } from 'next/font/google';
import UsFlag from '@/components/UsFlag';

const wordmark = Fraunces({
  subsets: ['latin'],
  weight: ['600', '700'],
});

function LoginForm() {
  const searchParams = useSearchParams();
  const appliedNotice = searchParams.get('applied') === '1';
  const urlEmail = searchParams.get('email') ?? '';
  const [email, setEmail] = useState(urlEmail);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Fetch profile to determine where to send the user
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .single();

    const next = searchParams.get('next');
    const safeNext =
      next && next.startsWith('/') && !next.startsWith('//') ? next : null;

    if (profile?.role === 'restaurant') {
      router.push(safeNext && safeNext.startsWith('/dashboard') ? safeNext : '/dashboard/restaurant');
    } else if (profile?.role === 'farm') {
      router.push(safeNext && safeNext.startsWith('/dashboard') ? safeNext : '/dashboard/farm');
    } else {
      router.push(safeNext && safeNext.startsWith('/admin') ? safeNext : '/admin/review-queue');
    }
    router.refresh();
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 justify-center flex-wrap">
            <span
              className={`${wordmark.className} text-2xl sm:text-[1.65rem] font-semibold text-[#1e293b] tracking-tight`}
            >
              RegenUS
            </span>
            <UsFlag className="inline-block w-6 h-[0.75em] rounded-[1px]" />
          </Link>
          <p className="text-stone-500 text-sm mt-3">Sign in to your account</p>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
          {appliedNotice && (
            <div className="bg-slate-50 border border-slate-200 text-slate-900 px-3 py-2.5 rounded-lg mb-5 text-sm">
              Your application was saved. Sign in with the password you just created to open your dashboard.
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2.5 rounded-lg mb-5 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1e293b] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1e293b] focus:border-transparent outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1e293b] text-white py-2.5 rounded-lg font-medium hover:bg-[#0f172a] transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-stone-500 mt-5">
          Don&apos;t have an account?{' '}
          <Link href="/apply" className="text-[#1e293b] font-medium hover:underline">
            Apply now
          </Link>
        </p>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] flex items-center justify-center text-stone-500 text-sm">Loading…</div>
    }>
      <LoginForm />
    </Suspense>
  );
}
