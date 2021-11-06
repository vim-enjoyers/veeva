import React, { Component, useState } from 'react'
import Head from 'next/head'
import UploadButton from '../components/upload-button'
import Link from 'next/Link'

const Index = () => {
  const [viewingReport, setViewingReport] = useState(false)
  const [doctors, setDoctors] = useState()

  return (
    <div className="">
      <Head>
        <title>Vim Enjoyers' Veeva Solution</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">

        <div className="p-12 text-center font-bold">
          <h1 className="text-4xl">Vim Enjoyer's Solution for Veeva's Challenge</h1>
          <h2 className="text-2xl text-gray-600">Hack Ohio 2021</h2>
        </div>
        {viewingReport ? (<div></div>) : (
          <div className="h-96 bg-gray-200">
            <UploadButton />
            <Link href="/?report" shallow>
              <a className="text-white px-8 py-4 text-md bg-blue-500 rounded shadow">Generate Report</a>
            </Link>
          </div>)}
      </main >

      <footer className="bg-gray-800 text-white h-16 flex items-center justify-center">
        <h1 className="font-bold text-lg">&copy; Vim Enjoyers 2021</h1>
      </footer>
    </div >
  )
}


export default Index