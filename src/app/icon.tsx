import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: 'linear-gradient(135deg, #C9A84C, #8B6F47)',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#090C18',
          fontSize: 18,
          fontWeight: 700,
          fontFamily: 'sans-serif',
        }}
      >
        PA
      </div>
    ),
    { ...size }
  );
}