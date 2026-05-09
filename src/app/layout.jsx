import '@/styles/globals.css';

export const metadata = {
  title: 'Pranav Arora — Senior ML Engineer',
  description: 'Senior ML Engineer specialising in production AI systems, LLMs, and reinforcement learning. Based in Singapore.',
  openGraph: {
    title: 'Pranav Arora — Senior ML Engineer',
    description: 'Production AI · LLMs · Reinforcement Learning',
    url: 'https://pranavarora.vercel.app',
     icons: {
    icon: '/icon',
  },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}