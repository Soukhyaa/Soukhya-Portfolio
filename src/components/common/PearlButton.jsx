import React from 'react';

export default function PearlButton({
  href,
  variant = 'primary',
  className = '',
  target,
  rel,
  children
}) {
  const variantClass = variant === 'secondary' ? 'btn-fashion-secondary' : 'btn-fashion-primary';

  return (
    <a
      href={href}
      className={`${variantClass} btn-pearl ${className}`.trim()}
      target={target}
      rel={rel}
    >
      <span>{children}</span>
      <span className="btn-star-wrap">
        <span className="star-icon star-outline">✧</span>
        <span className="star-icon star-solid">✦</span>
      </span>
    </a>
  );
}
