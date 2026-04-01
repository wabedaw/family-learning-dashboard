/**
 * Renders child avatar — supports both image paths and emoji fallback.
 * Image avatars get a teal (deep green) background circle to match the page theme.
 */
export default function Avatar({ src, size = 'md', className = '' }) {
  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };
  const sizeClass = sizes[size] || sizes.md;

  if (src && (src.startsWith('/') || src.startsWith('http'))) {
    return (
      <div className={`${sizeClass} rounded-full bg-teal-dark shrink-0 overflow-hidden border-2 border-teal shadow-sm ${className}`}>
        <img src={src} alt="avatar" className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <span className={`${sizeClass} flex items-center justify-center text-2xl ${className}`}>
      {src || '👤'}
    </span>
  );
}
