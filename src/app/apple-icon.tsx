import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'
 
export default function AppleIcon() {
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
          borderRadius: '20px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://tkafrokitchen.com/images/brand/tklogo.jpg"
          alt="TK Afro Kitchen Logo"
          style={{
            width: '140px',
            height: '140px',
            objectFit: 'contain',
            borderRadius: '12px',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
