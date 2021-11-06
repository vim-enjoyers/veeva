import React from 'react'
import Head from 'next/head'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Vim Enjoyers' Veeva Solution</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="h-20 md:h-16 text-center font-bold flex flex-col md:flex-row items-center justify-center md:justify-between px-4 shadow-md">
        <h1 className="text-lg">Generate a Prescriber Data Report</h1>
        <h2 className="md:text-md text-sm text-gray-600">Prepared by Vim Enjoyers for Veeva Systems</h2>
      </header>
      <main className="my-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white h-16 w-full flex items-center justify-center px-8 text-center">
        <h1 className="max-w-md">&copy; Vim Enjoyers 2021. Made at HACKOHI/O 2021.</h1>
      </footer>
    </>
  );
}

export default Layout;