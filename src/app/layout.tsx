import './global.css';
import { Jersey_25 } from 'next/font/google'

const jersey_25 = Jersey_25({weight: '400', subsets: ['latin']})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-gitBackground">
      <head>
        <meta name='viewport' content='initial-scale=1, viewport-fit=cover'/>
        <link rel='manifest' href="/manifest.json" />
        <link rel="icon" href="/icons/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/apple_touch_icon.png"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <meta name="apple-mobile-web-app-title" content="growth"/>
        <meta name="theme-color" content="#212121"/>
      </head>
      <body className={jersey_25.className}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
