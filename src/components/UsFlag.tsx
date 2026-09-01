export default function UsFlag({ className = 'inline-block w-5 h-[0.7em] align-middle rounded-[1px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 19 10" className={className} aria-hidden="true">
      <rect width="19" height="10" fill="#B22234" />
      <rect y="0.77" width="19" height="0.77" fill="#fff" />
      <rect y="2.31" width="19" height="0.77" fill="#fff" />
      <rect y="3.85" width="19" height="0.77" fill="#fff" />
      <rect y="5.38" width="19" height="0.77" fill="#fff" />
      <rect y="6.92" width="19" height="0.77" fill="#fff" />
      <rect y="8.46" width="19" height="0.77" fill="#fff" />
      <rect width="7.6" height="5.38" fill="#3C3B6E" />
    </svg>
  );
}
