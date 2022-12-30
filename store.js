import create from 'zustand'
import countries from './json/countries.json'
import model from './json/model.json';


export const useWorldMapStore = create((set, get) => ({
    numberSMEs: [...countries, {"name" : "Total"}, {"name" : "Other"}].map(c=>({...c, count: 0})),
    currentLoc: "Total",
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
export const useOverallSMEInfoStore = create((set, get) => ({
    country: countries[0].name,
    countries: countries,
    updateCountry: (newCountry) => set((state) => ({country: newCountry })),
}))

// Questions are in the [1, 5] integer interval, but the Radar widget uses the scale [0,100]
export function scaleValue(value, from, to) {
	var scale = (to[1] - to[0]) / (from[1] - from[0]);
	var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
	return Math.floor(capped * scale + to[0]);
}

// The store of the responses of the questionnaire and associated recommendations.
export const useQuestionnaireStore = create((set, get) => ({
   questionnaire: model.questionnaire.map(q => ({ ...q, value : 3})), // add default question value

   // initially, no recommendations apply.
   dimensionRecommendations: model.dimension_recommendations.map(r => ({ ...r, applicable : false})),
   questionRecommendations: model.question_recommendations.map(r => ({ ...r, applicable : false})),
   
   // Results, averages to be fetched, and the ones for the current SME computed.
   dimensionStats: [],

   // check the just question just changed has some applicable recommendations
   updateQuestionRecommendations: (questionId, newValue) => {
        set((state) => ({questionRecommendations: state.questionRecommendations.map(
                                                 r => r.question===questionId 
                                                 ? newValue >= r.from && newValue <=r.to? {...r, applicable : true} : {...r, applicable : false}
                                                 : r )}))
   },

   // check the dimension of the question changed has some applicable recommendations
   updateDimensionRecommendations: (dimensionId) => {
      const newScore = get().getDimensionScore(dimensionId)
      console.log(newScore)
      set((state) => ({dimensionRecommendations : state.dimensionRecommendations.map(
                                                    r => r.dimension===dimensionId 
                                                          ? newScore >= r.from && newScore <=r.to? {...r, applicable : true} : {...r, applicable : false}
                                                          : r )})
      )
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
            set((state)=> ({dimensionStats: fetchedDimensions.map(d=>({...d, score: scaleValue(get().getDimensionScore(d.id), [1,5], [0,100])}))}))
          },

}))







