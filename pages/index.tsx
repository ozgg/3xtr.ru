import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trickster (WIP)</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Trickster WIP
        </h1>

        <p className={styles.description}>
          <Link href="/my/corpora">Corpora</Link>
        </p>
      </main>
    </div>
  )
}
