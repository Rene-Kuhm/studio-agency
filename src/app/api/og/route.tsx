import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get('title') || 'TecnoDespegue';
  const description = searchParams.get('description') || 'Agencia Digital';
  const type = searchParams.get('type') || 'default'; // default, blog, service

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1614',
          backgroundImage: 'radial-gradient(circle at 25% 25%, #2a2420 0%, transparent 50%), radial-gradient(circle at 75% 75%, #3d3530 0%, transparent 50%)',
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          {/* Logo */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              backgroundColor: '#a67c52',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L16 10H14V16H10V10H8L12 2Z" fill="#f8f5f2"/>
              <rect x="10" y="17" width="4" height="1.5" rx="0.75" fill="#f8f5f2" opacity="0.8"/>
              <rect x="10.5" y="19" width="3" height="1.5" rx="0.75" fill="#f8f5f2" opacity="0.6"/>
            </svg>
          </div>
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: '#f8f5f2',
            }}
          >
            Tecno<span style={{ color: '#a67c52' }}>Despegue</span>
          </span>
        </div>

        {/* Type badge */}
        {type === 'blog' && (
          <div
            style={{
              position: 'absolute',
              top: 40,
              right: 40,
              padding: '8px 20px',
              borderRadius: 100,
              backgroundColor: '#a67c52',
              color: '#f8f5f2',
              fontSize: 14,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Blog
          </div>
        )}

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 80px',
            textAlign: 'center',
            marginTop: 40,
          }}
        >
          <h1
            style={{
              fontSize: title.length > 40 ? 48 : 64,
              fontWeight: 800,
              color: '#f8f5f2',
              lineHeight: 1.1,
              marginBottom: 24,
              maxWidth: 900,
            }}
          >
            {title}
          </h1>

          {description && (
            <p
              style={{
                fontSize: 24,
                color: '#a8a29e',
                maxWidth: 700,
                lineHeight: 1.4,
              }}
            >
              {description.length > 120
                ? description.substring(0, 120) + '...'
                : description}
            </p>
          )}
        </div>

        {/* Bottom decoration */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: i === 2 ? '#a67c52' : '#3d3530',
              }}
            />
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            fontSize: 16,
            color: '#78716c',
          }}
        >
          tecnodespegue.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
