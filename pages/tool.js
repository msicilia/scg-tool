import {Tabs, Tab, Box } from 'grommet';
import React from 'react';
//import 'survey-core/defaultV2.min.css';
// import { StylesManager } from 'survey-core';
//import {Survey, Model} from 'survey-react-ui'
////import { useContext, useState} from 'react'
//import { ModelContext } from '../ModelContext'
import OverallSMEInfo  from '../components/OverallSMEInfo'
import Results  from '../components/Results'
import Recommendations  from '../components/Recommendations'
import QuestionSet  from '../components/QuestionSet'
import dimensions from '../json/dimensions.json'


export default function Tool() {
    return <Box align="center">
       <Tabs>
       <Tab title="SME description">
            <OverallSMEInfo/>
       </Tab>
       {dimensions.map((d) =>
                <Tab key={d.id} title={d.name}>
                  <QuestionSet dimension={d.id}/>
                </Tab>
        )}
        <Tab title="Results">
            <Results/>
        </Tab>
        <Tab title="Recommendations" >
            <Recommendations/>
        </Tab>
    </Tabs>
    </Box>;
  }