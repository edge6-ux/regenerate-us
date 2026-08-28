'use client';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-[#1e293b] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0f172a] transition-colors"
    >
      Print card
    </button>
  );
}
