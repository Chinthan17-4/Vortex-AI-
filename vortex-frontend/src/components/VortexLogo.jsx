/**
 * VortexLogo — Horizon Glow logo component
 *
 * @param {number|string} size - Size in pixels (default 48)
 * @param {string} className - Optional additional CSS class
 */
function VortexLogo({ size = 48, className = '' }) {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <img
      src="/vortex_horizon_logo.png"
      alt="Vortex AI logo"
      className={className}
      style={{
        display: 'block',
        objectFit: 'contain',
        width: pixelSize,
        height: pixelSize,
        flexShrink: 0,
      }}
    />
  );
}

export default VortexLogo;

