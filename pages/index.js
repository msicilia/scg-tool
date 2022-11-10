import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { WorldMap } from 'grommet'
import Link from 'next/link';

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="SME Cluster Growth Self-Assessment Tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://smeclustergrowth.eu/">SME Cluster Growth </a> Self Assessment Tool
        </h1>

        <p className={styles.description}>
          Test your growth potential and obtain recommendations about pathways to improve
        </p>

        <div className={styles.grid}>
          <Link href="/tool" >
          <div className={styles.card}>
            <h2>Use the tool</h2>
            <p>Provide information on your SME.</p>
          </div>
          </Link>

          <Link href="/about" >
            <div className={styles.card}>
              <h2>Learn more</h2>
              <p>About the tool and the project</p>
            </div>
          </Link>
        </div>
        <div>
        <WorldMap 
          color="neutral-1"
          onSelectPlace={(lat, lon) => {}}
          selectColor="accent-2"
        />
        </div>
      </main>

 
    </div>

  )
}
