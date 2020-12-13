import Head from 'next/head'
import Layout from '../components/layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-2xl text-center text-yellow-400">
        Hello
      </main>
    </Layout>
  )
}
