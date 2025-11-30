import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#a67c52',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 40,
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M12 1L18 11H15V19H9V11H6L12 1Z" fill="#f8f5f2" />
          <rect x="9" y="20" width="6" height="1.5" rx="0.75" fill="#f8f5f2" opacity="0.85" />
          <rect x="9.5" y="22" width="5" height="1" rx="0.5" fill="#f8f5f2" opacity="0.6" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
