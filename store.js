import create from 'zustand'
import countries from './json/countries.json'
import dimensions from './json/dimensions.json'

import model from './json/model.json';
import { persist } from 'zustand/middleware'
import { scaleValue } from './util.js'

export const useWorldMapStore = create((set, get) => ({
    numberSMEs: [...countries],
    currentLoc: "Spain",
    getCount: location => get().numberSMEs.filter((loc) =>loc.name == location)[0].count,
    selectLocation: location => set((state) => ({ currentLoc: location })),
    incrementUses:  location => {
                           set((state) => ({numberSMEs: state.numberSMEs.map(
                                                (loc)=> loc.name === location
                                                        ?  {...loc, count:loc.count + 1}
                                                        : loc   )}))
                        },
  }))

// Add here state for the overall description of the SME.
// At least country is required to maintain the stats per country.
export const useOverallSMEInfoStore = create(
  persist(
    (set, get) => ({
       country: countries[1].name,
       countries: countries,
       updateCountry: (newCountry) => set((state) => ({country: newCountry })),
}), 
{
  name: 'smeinfo-storage', // name of the item in the storage (must be unique)
}
))



// The store of the responses of the questionnaire and associated recommendations.
export const useQuestionnaireStore = create(
  persist(
    (set, get) => ({

        //isInInitialState : true,

        questionnaire: model.questionnaire.map(q => ({ ...q, value : 3})), // add default question value

        // initially, no recommendations apply.
        dimensionRecommendations: model.dimension_recommendations.map(r => ({ ...r, applicable : false})),
        questionRecommendations: model.question_recommendations.map(r => ({ ...r, applicable : false})),

        // Results, averages to be fetched, and the ones for the current SME computed.
        dimensionStats: [],


        // check the just question just changed has some applicable recommendations
        updateQuestionRecommendations: (questionId, newValue) => {
              set((state) => ({questionRecommendations://[...new Map(
                                                      state.questionRecommendations.map(
                                                      r => r.question===questionId ?
                                                          newValue >= r.from && newValue <=r.to? {...r, applicable : true} : {...r, applicable : false}
                                                      : r )
                                                      //.map(x=>[x.text, x])).values()]} // convert to Map to remove duplicate objects
        })) 
        },

        // check the dimension of the question changed has some applicable recommendations
        updateDimensionRecommendations: (dimensionId) => {
            const newScore = get().getDimensionScore(dimensionId)
            set((state) => ({dimensionRecommendations : //[...new Map(
              state.dimensionRecommendations.map(
                                                          r => r.dimension===dimensionId ?
                                                                 newScore >= r.from && newScore <=r.to? {...r, applicable : true} : {...r, applicable : false}
                                                          : r )
                                                          //.map(x=>[x.text, x])).values()]})
                                                        }))
        },

        getQuestions: (dimension) => get().questionnaire.filter(q => q.dimension===dimension),
        getDimensionScore: (dimension) => { const scores = get().getQuestions(dimension).map(q => q.value * q.weight / 100)
                                            return scores.reduce((partialSum, a) => partialSum + a, 0) 
                                            },

        updateAnswer: (dimensionId, questionId, newValue) =>  {
                      set((state) => ({questionnaire: state.questionnaire.map(
                                              q=> q.id === questionId
                                              ? {...q, value : newValue}
                                              : q)}))
                      get().updateQuestionRecommendations(questionId, newValue)
                      get().updateDimensionRecommendations(dimensionId)
                },
          setDimensionStats : (fetchedDimensions) => {
                  set((state)=> ({dimensionStats: fetchedDimensions.map(d=>({...d, 
                                                                            score: scaleValue(get().getDimensionScore(d.id), [1,5], [0,100])}))}))
                },

        initializeRecommendations : () => {
              console.log("initialRecommendations")
              dimensions.forEach((d) =>{get().updateDimensionRecommendations(d.id)})
              model.questionnaire.forEach((q) =>{ get().updateQuestionRecommendations(q.id, get().questionnaire.filter((qs)=>qs.id===q.id)[0].value)})
        }

}), 
{
  name: 'questionnaireinfo-storage', // name of the item in the storage (must be unique)
}
))







