import {Box, Text, Select } from 'grommet';
import { useOverallSMEInfoStore } from '../store.js'

/**
 * The set of descriptors of the SME. 
 */

export default function OverallSMEInfo() {
   const [country, countries, updateCountry] = useOverallSMEInfoStore(
      (state) => [state.country, state.countries, state.updateCountry],
    )
  return   <Box pad="medium">   
                <Text>Country </Text>    
                <Select
                    options={countries.filter(c=>c.name!=="Total").map((c)=>c.name)}
                    value={country}
                    onChange={({ option }) => updateCountry(option)}
                />
            </Box>;
}
