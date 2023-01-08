import '../styles/globals.css'
import { grommet, Grommet, Header, Image, Box, Footer } from 'grommet';
import {Github, Linkedin} from 'grommet-icons';
import Link from 'next/link';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {

  return <Grommet theme={grommet}>
              <Head>
                 <title>SME Cluster Growth Self assessment</title>
              </Head>
                <Header background="light-0" margin="medium">
                  <Box width="xsmall" xheight="small" >
                  <Link href="/">
                    <Image src="/cropped-sme-growth-cluster-FINAL-LOGO.png" alt=""></Image>
                  </Link>
                  </Box>
                </Header>
            <Box flex> <Component {...pageProps} /> </Box>
            <Box align="center" background="light-1" margin="large">
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
}

export default MyApp
