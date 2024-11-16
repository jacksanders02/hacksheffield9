import './global.css';
import { Jersey_25 } from 'next/font/google'

const jersey_25 = Jersey_25({weight: '400', subsets: ['latin']})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jersey_25.className}>
        <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
