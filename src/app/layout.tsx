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
      <body className={jersey_25.className}>{children}</body>
    </html>
  );
}
