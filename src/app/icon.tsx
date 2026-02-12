import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://tkafrokitchen.com/images/brand/tklogo.jpg"
          alt="TK Afro Kitchen Logo"
          style={{
            width: '28px',
            height: '28px',
            objectFit: 'contain',
            borderRadius: '2px',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
