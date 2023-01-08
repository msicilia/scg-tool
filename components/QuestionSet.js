
import Likert from 'react-likert-scale';
import { useQuestionnaireStore } from '../store.js'
import { Box } from 'grommet';

/**
 * Set of questions for a dimension. 
 */

export default function QuestionSet({dimension}) {
    const [questionnaire, updateAnswer] = useQuestionnaireStore(
       (state) => [state.questionnaire, state.updateAnswer],
    )
    return  questionnaire.filter(q => q.dimension===dimension)
                          .map(q =>
                                <Box pad="medium" flex key={q.id} >
                                <Likert question={q.text}  layout="stacked" key={q.id} 
                                onChange={selected => updateAnswer(q.dimension, q.id, selected.value)}
                                responses ={[
                                        { value: 1, text: "Completely Disagree", checked: q.value === 1, id: q.id , dimid: dimension},
                                        { value: 2, text: "", checked: q.value === 2, id: q.id, dimid: dimension },
                                        { value: 3, text: "", checked: q.value === 3, id: q.id , dimid: dimension },
                                        { value: 4, text: "", checked: q.value === 4, id: q.id , dimid: dimension },
                                        { value: 5, text: "Completely Agree", checked: q.value === 5, id: q.id , dimid: dimension}  ] } 
                                >
                              </Likert></Box>
            )
  }
  