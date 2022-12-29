import create from 'zustand'
import countries from './pages/countries.json'

//const response = await fetch("/api/countrystats");
//console.log(response)

export const useWorldMapStore = create((set, get) => ({
    // TODO: replace counts with reading countries and initializing to zero.

    numberSMEs: [{name :"Total", count:10}, 
                 {name :"Spain", count: 5}, {name :"France",count: 4}, ],
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

export const useAnswersStore = create((set, get) => ({
    
  }))

  export const useAverageStore = create((set, get) => ({
    
  }))