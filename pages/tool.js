import {Tabs, Tab, Box } from 'grommet';
import OverallSMEInfo  from '../components/OverallSMEInfo'
import Results  from '../components/Results'
import Recommendations  from '../components/Recommendations'
import QuestionSet  from '../components/QuestionSet'
import dimensions from '../json/dimensions.json'
import { useQuestionnaireStore } from '../store.js'
import { useEffect } from 'react'

export default function Tool() {

    const [initializeRecommendations] = useQuestionnaireStore(
        (state) => [state.initializeRecommendations],
      )
    useEffect(() => {
         initializeRecommendations()   
    }, []);
    

    // const initial = useQuestionnaireStore((state) => state.isInInitialState)
    return  <Box>
              <Tabs flex justifyContent="center" margin="xlarge">
                  <Tab title="SME info" >
                        <OverallSMEInfo/>
                  </Tab>
                  {dimensions.map((d) =>
                        <Tab key={d.id} title={d.name}>
                          <QuestionSet dimension={d.id}/>
                        </Tab>
                    )}
                    <Tab title="Results" >
                        <Results/>
                    </Tab>
                    <Tab title="Advice" >
                        <Recommendations/>
                    </Tab>
            </Tabs>
    </Box>
  }