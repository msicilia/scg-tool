import '../styles/globals.css'
import { grommet, Grommet, Header, Image, Box, Footer } from 'grommet';
import {Github, Linkedin} from 'grommet-icons';
import Link from 'next/link';
import Head from 'next/head';
import { ModelContextProvider } from '../ModelContext'

function MyApp({ Component, pageProps }) {

  return <ModelContextProvider>
          <Grommet theme={grommet}>
              <Head>
                 <title>SME Cluster Growth Self assessment</title>
              </Head>
                <Header background="light-1" margin="small">
                  <Box width="xsmall" xheight="small" >
                  <Link href="/">
                    <Image  src="/cropped-sme-growth-cluster-FINAL-LOGO.png"></Image>
                  </Link>
                  </Box>
                </Header>
            <Component {...pageProps} />
            <Box align="center" background="light-1">
              <Footer margin="small"> 
                 <a href="https://github.com/msicilia/scg-tool">         
                     <Github size="medium"></Github>
               </a>
               <a href="https://www.linkedin.com/company/sme-cluster-growth-empowered-engineering/">         
                     <Linkedin size="medium"></Linkedin>
               </a>
      </Footer> 
    </Box>
    </Grommet>
    </ModelContextProvider> 
}

export default MyApp
