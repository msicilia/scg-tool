import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Button, WorldMap } from 'grommet'
import Link from 'next/link';
import { useWorldMapStore } from '../store.js'
import countries from './countries.json'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

const fetcher = (...args) => fetch(...args).then((res) => res.json());

async function updateCount(url, { arg }) {
  console.log(arg)
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg)
  })
}

export default function Home(props) {
  const { data, error } = useSWR('/api/countrystats', fetcher)
  const { trigger } = useSWRMutation('/api/countrystats', updateCount)

  const {getCount, currentLoc, selectLocation, incrementUses} = 
          useWorldMapStore((state) => ({getCount:state.getCount,
                                        currentLoc:state.currentLoc,
                                        selectLocation: state.selectLocation,
                                        incrementUses: state.incrementUses}))

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
                                             onClick: (name) => {trigger({location: country.name})}
                                             }) ) }
          /*  [
            {
              name: 'Spain',
              location: [40.2085, -3.7130 ],
              color: 'graph-2',
              onHover: (name) => {selectLocation("Spain")},
            },
            {
              name: 'France',
              location: [46.7111, 1.7191],
              color: 'graph-2',
              onHover: (name) => {selectLocation("France")},
              onClick: (name) => {incrementUses("France")},

            },
          ]*/
          selectColor="accent-2"
        />
        </div>
      </main>

 
    </div>

  )
}
