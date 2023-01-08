import {Box, Accordion, AccordionPanel } from 'grommet';
import ReactMarkdown from 'react-markdown'
import dimensions from '../json/dimensions.json'
import { useQuestionnaireStore } from '../store.js'

/**
 * Show the recommendations associated to the current answers given to the questions.
 */

export default function Recommendations() {
  const [dimensionRecommendations, questionRecommendations] = useQuestionnaireStore(
      (state) => [state.dimensionRecommendations, state.questionRecommendations]
    )
    return <Accordion>
              {dimensions.map( dimension =>{
                  return <AccordionPanel label={dimension.name} key={dimension.id}>
                                 {questionRecommendations.filter(r => r.dimension===dimension.id && r.applicable)
                                                      .filter((elem, index, col) => col.findIndex((t)=>t.text===elem.text)===index)
                                                      .map(r => { return <Box pad="medium" background="light-2" 
                                                                          key={r.id} width="xlarge" gap="small">
                                                                              <ReactMarkdown>{r.text}</ReactMarkdown>
                                                                         </Box>
                                                      })}
                                 {dimensionRecommendations.filter(r => r.dimension===dimension.id && r.applicable)
                                                          // .filter((elem, index, col) => col.findIndex((t)=>t.text===elem.text)===index)
                                                          .map(r => { return <Box pad="medium" background="light-2" 
                                                                          key={r.id} width="xlarge" gap="small">
                                                                              <ReactMarkdown>{r.text}</ReactMarkdown>
                                                                          </Box>
                                                      })}
                          </AccordionPanel>
              })}
            </Accordion>
  }



  
