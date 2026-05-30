import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://shaminportfolio.vercel.app"),
  title: "Shamin Chokshi — AI Engineer & Data Scientist",
  description:
    "Shamin Chokshi — Generative AI Data Scientist & AI Engineer. Building agentic systems, RAG pipelines, and ML at scale.",
  openGraph: {
    title: "Shamin Chokshi — AI Engineer & Data Scientist",
    description: "Building agentic AI systems, RAG pipelines, and ML at production scale.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Hanken+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg font-body text-ink antialiased">{children}</body>
    </html>
  );
}
