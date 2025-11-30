import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #a67c52 0%, #8b6544 100%)',
          borderRadius: '32px',
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
        >
          {/* Rocket body */}
          <path
            d="M12 2L16 10H14V16H10V10H8L12 2Z"
            fill="#f8f5f2"
          />
          {/* Exhaust flames */}
          <rect x="10" y="17" width="4" height="2" rx="1" fill="#f8f5f2" opacity="0.9" />
          <rect x="10.5" y="19.5" width="3" height="2" rx="1" fill="#f8f5f2" opacity="0.7" />
          <rect x="11" y="22" width="2" height="1.5" rx="0.75" fill="#f8f5f2" opacity="0.5" />
        </svg>
      </div>
    ),
    {
      width: 192,
      height: 192,
    }
  );
}
