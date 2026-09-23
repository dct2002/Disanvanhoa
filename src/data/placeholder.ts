/**
 * Sinh ảnh placeholder dạng SVG (data URI) cho các di sản chưa có ảnh thật.
 * Khi có ảnh chính thức, chỉ cần thay giá trị `image` trong heritage.ts bằng URL thật.
 */
export function placeholderImage(label: string, seed = 0): string {
  const hue = (seed * 47) % 360;
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${hue}, 35%, 14%)"/>
      <stop offset="55%" stop-color="#241315"/>
      <stop offset="100%" stop-color="#0e0b0a"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#d4af37" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#d4af37" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <rect width="1200" height="800" fill="url(#glow)"/>
  <g stroke="#d4af37" stroke-width="1.5" opacity="0.55" fill="none">
    <circle cx="600" cy="400" r="230"/>
    <circle cx="600" cy="400" r="170"/>
    <circle cx="600" cy="400" r="110"/>
    <circle cx="600" cy="400" r="50"/>
  </g>
  <g stroke="#d4af37" stroke-width="1" opacity="0.3" fill="none">
    ${Array.from({ length: 16 })
      .map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const x1 = 600 + Math.cos(a) * 230;
        const y1 = 400 + Math.sin(a) * 230;
        const x2 = 600 + Math.cos(a) * 280;
        const y2 = 400 + Math.sin(a) * 280;
        return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
      })
      .join("")}
  </g>
  <text x="600" y="410" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="#f4e9d8" opacity="0.9">${escapeXml(
    label
  )}</text>
</svg>`.trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
