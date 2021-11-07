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
        <header className="flex-none bg-text text-lightgray h-20 md:h-16 text-center font-bold flex flex-col md:flex-row items-center justify-center md:justify-between px-4 shadow-lg">
          <h2 className="text-2xl"><Link href="/"><a>Generate a Prescriber Data Report</a></Link></h2>
          <h6 className="md:text-md text-sm">Prepared by Vim Enjoyers for Veeva Systems</h6>
          {/*
          TODO: About page
          <Link><a>About</a></Link> */}
        </header>
        <main className="flex-auto flex my-6 lg:py-8 px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="flex-1 w-full">
            {children}
          </div>
        </main>
        <footer className="flex-none bg-footer text-lightgray text-sm h-12 w-full flex items-center justify-center px-8 text-center">
          <h6 className="max-w-lg">&copy; Vim Enjoyers 2021. Made at HACKOHI/O 2021. <a className="hover:underline hover:opacity-70 font-normal normal-case" href="https://github.com/vim-enjoyers/veeva" target="_blank" rel="noopener noreferrer">View on GitHub</a></h6>
        </footer>
      </div >
    </>
  );
}

export default Layout;