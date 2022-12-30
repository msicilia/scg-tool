
import Likert from 'react-likert-scale';
import { useQuestionnaireStore } from '../store.js'
/*
  const applyRecommendations = (model, dimension) =>{
    const potential_recs = model.recommendations[dimension.id]
    if (!model.current_recs)
        model.current_recs = {}
    model.current_recs[dimension.id] = potential_recs.filter(rec =>dimension.score < rec.to)
}

const applyRecommendationsToQuestions = (model, question_id) =>{
    
}

const computeOverallScores = (model) =>{
     model.questionnaire.forEach(dim =>{
       // Compute average of the scores of each question of the dimension
       dim.score = dim.questions.map(q => q.value).reduce((a, b) => a + b, 0)/dim.questions.length
     })
 
}
const initialQuestionnaireState = (model) =>{
     // Add the initial response states to the questionnaire.
     model.questionnaire.forEach(dim => {
         dim.questions = dim.questions.map(q => {return {value:3,...q}})
     })
     
     // Compute initial overall scores (needed to provide recommendations):
     computeOverallScores(model);
     
     // Compute initial recommendations:
     model.questionnaire.forEach( dim => { applyRecommendations(model, dim);
     })

     return model
};



   const update = (val) => {
          // Update a Likert item and recompute overall score and recommendations. 
          let modelCopy = {...model}
          let dimensionIdx = modelCopy.questionnaire.findIndex(d => d.id === val.dimid)
          let questionIdx = modelCopy.questionnaire[dimensionIdx].questions.findIndex(q => q.id===val.id)
          modelCopy.questionnaire[dimensionIdx].questions[questionIdx].value = val.value
          computeOverallScores(model);
          model.questionnaire.forEach( dim => { applyRecommendations(model, dim);
          })
          updateModel(modelCopy)
   } 

const [model, updateModel] = useState(initialQuestionnaireState(modelContext));
*/
export default function QuestionSet({dimension}) {
    const [questionnaire, updateAnswer] = useQuestionnaireStore(
       (state) => [state.questionnaire, state.updateAnswer],
    )
    const getDimensionScore = useQuestionnaireStore(
        (state) => state.getDimensionScore
     )
    return  questionnaire.filter(q => q.dimension===dimension)
                          .map(q =>
                                <Likert question={q.text}  layout="stacked" key={q.id} 
                                onChange={selected => updateAnswer(q.dimension, q.id, selected.value)}
                                responses ={[
                                        { value: 1, text: "Completely Disagree", checked: q.value === 1, id: q.id , dimid: dimension},
                                        { value: 2, text: "", checked: q.value === 2, id: q.id, dimid: dimension },
                                        { value: 3, text: "", checked: q.value === 3, id: q.id , dimid: dimension },
                                        { value: 4, text: "", checked: q.value === 4, id: q.id , dimid: dimension },
                                        { value: 5, text: "Completely Agree", checked: q.value === 5, id: q.id , dimid: dimension}  ] } 
                                >
                              </Likert>
            )
    /*{model.questionnaire.map( dimension =>{
        return <Tab title={dimension.title} key={dimension.id}>
              { dimension.questions.map (item => {
                return <Likert question={item.text}  layout="stacked" key={item.id} 
                        onChange={update}
                  responses ={[
                    { value: 1, text: "Completely Disagree", checked: item.value === 1, id: item.id , dimid: dimension.id},
                    { value: 2, text: "", checked: item.value === 2, id: item.id, dimid: dimension.id },
                    { value: 3, text: "", checked: item.value === 3, id: item.id , dimid: dimension.id },
                    { value: 4, text: "", checked: item.value === 4, id: item.id , dimid: dimension.id },
                    { value: 5, text: "Completely Agree", checked: item.value === 5, id: item.id , dimid: dimension.id }  ] } 
                  >
                  </Likert>
              })}
             </Tab>  
            })}
  */
  }
  