import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { WorldMap } from 'grommet'
import Link from 'next/link';
import { useWorldMapStore } from '../store.js'
import countries from '../json/countries.json'
import useSWR from 'swr'


const fetcher = (...args) => fetch(...args).then((res) => res.json());


export default function Home(props) {
  const { data, error } = useSWR('/api/countrystats', fetcher)

  const {getCount, currentLoc, selectLocation} = 
          useWorldMapStore((state) => ({getCount:state.getCount,
                                        currentLoc:state.currentLoc,
                                        selectLocation: state.selectLocation}))

  return (
    <div className={styles.container}>
      <Head>
        <title>CSME Cluster Growth Tool</title>
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
        <div>{getCount(currentLoc)} SMEs used the tool in {currentLoc}</div>
        <div>
        <WorldMap 
          color="graph-0"
          places={ countries.map((country)=>(
                                            {name: country.name,
                                             location: [country.lat, country.lon],
                                             color: 'graph-2',
                                             onHover: (name) => {selectLocation(country.name)},
                                             }) ) }
          selectColor="accent-2"
        />
        </div>
      </main>
    </div>

  )
}
