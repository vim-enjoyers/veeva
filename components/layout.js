import React from 'react'
import Head from 'next/head'
import { use100vh } from 'react-div-100vh'
import Link from 'next/Link'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Vim Enjoyers' Veeva Solution</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col" style={{ minHeight: use100vh() }}>
        <header className="flex-none h-20 md:h-16 text-center font-bold flex flex-col md:flex-row items-center justify-center md:justify-between px-4 shadow-md">
          <h1 className="text-lg"><Link href="/"><a>Generate a Prescriber Data Report</a></Link></h1>
          <h2 className="md:text-md text-sm text-gray-600">Prepared by Vim Enjoyers for Veeva Systems</h2>
          {/*
          TODO: About page
          <Link><a>About</a></Link> */}
        </header>
        <main className="flex-auto my-8">
          {children}
        </main>
        <footer className="flex-none bg-gray-800 text-white h-16 w-full flex items-center justify-center px-8 text-center">
          <h1 className="max-w-md">&copy; Vim Enjoyers 2021. Made at HACKOHI/O 2021.</h1>
        </footer>
      </div>
    </>
  );
}

export default Layout;