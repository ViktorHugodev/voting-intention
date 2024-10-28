import { PropsWithChildren } from 'react';
import '@/styles/globals.css';
import { ThemeProvider } from './theme-provider';

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <title>IBGE - Intenção de votos.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/img/favicon.ico" />
      </head>
      <body id={'root'} className="loading bg-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main id="skip">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
