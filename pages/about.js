import styles from '../styles/Home.module.css'


export default function About() {
    return <>
            <div className={styles.container}>
            <h1>About</h1>
              <p>This tool is an open educational resource (OER) developed
                in the framework of the Erasmus+ project 
                <a href="https://smeclustergrowth.eu/"> SME Cluster Growth</a>.</p>
              <p>The tool is intended to help SMEs identify barriers and bottelenecks
                to growth and it would typically be used along with training or 
                mentoring activities as a self-assessment tool. 
              </p>
              <p>The tool is open source and is intended to be adapted,
                repurposed or extended for particular contexts. It does not 
                feature persistent storage, but it could be extended to 
                integrate with existing sytems, e.g. a Learning Managment System (LMS).
              </p>
              </div>
            </>;
  }