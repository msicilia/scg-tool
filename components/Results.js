import {Box, Button } from 'grommet';
import { Radar } from '@nivo/radar'
import { useEffect, useState} from "react";
import dimensions from '../json/dimensions.json'
import { useQuestionnaireStore, useOverallSMEInfoStore, useWorldMapStore } from '../store.js'
import { scaleValue } from '../util.js'

/**
 * The results of the SME assessment, based on the questionnaire answers. 
 */

export default function Results() {

  // state to force refetching of overall stats.
  //const [reloadAverages, changeReloadAverages ] = useState(true)
  //const refetch = () =>{
  //  console.log("refetch")
  //  changeReloadAverages(!reloadAverages)
  //}

  const country = useOverallSMEInfoStore(
    (state) => state.country,
  )
  const incrementUses = useWorldMapStore(
    (state) => state.incrementUses,
  )
  const dimensionStats = useQuestionnaireStore(
    (state) => state.dimensionStats,
  )
  const setDimensionStats = useQuestionnaireStore(
      (state) => state.setDimensionStats,
  )


// Load the averages of the dimensions. 
useEffect(() => {
  console.log("fetching")
  fetch("/api/dimensionstats")
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setDimensionStats(data);
    });
}, []);


// Save stats for the averages of the dimensions and the counting of countries.
 const submit =  async () =>{
      const scores = dimensionStats // .map((d)=>({...d, score : scaleValue(getDimensionScore(d.id), [1,5], [0,100])}))
      const currentCountry = country
      incrementUses(country)
      await fetch("/api/countrystats", {
        method: 'POST',
        body: JSON.stringify({location: currentCountry })
      })
      
      console.log(scores)
      await fetch("/api/dimensionstats", {
        method: 'POST',
        body: JSON.stringify(scores)
      })
  }

  return <Box height="800" width="800" fill={true} align="center">
          <Radar theme={{fontSize : 14}}
            height={420} width={600}
            data={dimensionStats}
            keys={[ 'score', 'average' ]}
            indexBy="name"
            valueFormat=">-.1f" maxValue={100}
            margin={{ top: 20, right: 150, bottom: 20, left: 150}}
            borderColor={{ from: 'color' }}
            gridLabelOffset={15}
            dotSize={10} dotColor={{ theme: 'background' }} dotBorderWidth={3}
            colors={{ scheme: 'nivo' }}
            blendMode="multiply" motionConfig="wobbly"
            legends={[
                {
                    anchor: 'bottom-left', direction: 'column',
                    translateX: -150, translateY: -300,
                    itemWidth: 80, itemHeight: 20, itemTextColor: '#999',
                    symbolSize: 14, symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
          />
          <Box direction="row" pad="large">
              <Button primary label="submit" onClick={submit} tip={{content: "Submit the current answer for stats"}}/>
          </Box>
        </Box>

}
