import React from "react";
import Head from "next/head";

export default function Layout({ title, children }) {
  return (
    <div className="bg-gray-400">
      <Head>
        <title>{title} · Next.js Pokédex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto max-w-xl pt-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}