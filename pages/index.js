import Head from 'next/head'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Vim Enjoyers' Veeva Solution</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className="">
        
        <div className="p-12 text-center font-bold">
          <h1 className="text-4xl">Vim Enjoyer's Solution for Veeva's Challenge</h1>
          <h2 className="text-2xl text-gray-600">Hack Ohio 2021</h2>
        </div>

        <div className="h-96 bg-gray-200">

        </div>
      </main>

      <footer className="bg-gray-800 text-white h-16 flex items-center justify-center">
        <h1 className="font-bold text-lg">&copy; Vim Enjoyers 2021</h1>
      </footer>
    </div>
  )
}
