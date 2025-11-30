import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#a67c52',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 6,
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M12 2L17 10H14.5V18H9.5V10H7L12 2Z" fill="#f8f5f2" />
          <rect x="9.5" y="19" width="5" height="1.5" rx="0.75" fill="#f8f5f2" opacity="0.85" />
          <rect x="10" y="21" width="4" height="1" rx="0.5" fill="#f8f5f2" opacity="0.6" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
