import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="bg-white border border-stone-200 rounded-2xl p-10">
        <h1 className="text-3xl font-bold text-stone-900 mb-4">Application Submitted!</h1>
        <p className="text-stone-600 mb-2 leading-relaxed">
          Thank you for applying to Regen USA.
        </p>
        <p className="text-stone-600 mb-8 leading-relaxed">
          Our team will review your application. You&apos;ll hear from us within 5-7 business days.
        </p>
        <p className="text-stone-600 mb-8 text-sm leading-relaxed">
          You can sign in anytime at{' '}
          <Link href="/login" className="text-[#1e293b] font-medium hover:underline">
            /login
          </Link>{' '}
          with your contact email and the password you chose.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="bg-[#1e293b] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#0f172a] transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/"
            className="border border-stone-300 text-stone-700 px-6 py-2.5 rounded-lg font-medium hover:bg-stone-50 transition-colors"
          >
            Return Home
          </Link>
          <Link
            href="/directory"
            className="border border-stone-300 text-stone-700 px-6 py-2.5 rounded-lg font-medium hover:bg-stone-50 transition-colors"
          >
            Browse the Directory
          </Link>
        </div>
      </div>
    </div>
  );
}
