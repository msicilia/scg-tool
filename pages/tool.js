import {Heading, Tabs, Tab, Box, Accordion, AccordionPanel, Text, TextArea, Button, RangeInput, Select } from 'grommet';
import { Radar } from '@nivo/radar'
import React from 'react';
import 'survey-core/defaultV2.min.css';
import { StylesManager } from 'survey-core';
import {Survey, Model} from 'survey-react-ui'
import { useContext, useState} from 'react'
import { ModelContext } from './ModelContext'
import Likert from 'react-likert-scale';
import { motionDefaultProps } from '@nivo/core';
import ReactMarkdown from 'react-markdown'


export default function Tool() {

   StylesManager.applyTheme("defaultV2");
   // modelContext contains the static definition of dimensions, questions and recommendations.
   // we used it as the global state of the tool, with all the collected and computed information kept up to date in it.  
   const modelContext = useContext(ModelContext);

   const applyRecommendations = (model, dimension) =>{
       const potential_recs = model.recommendations[dimension.id]
       if (!model.current_recs)
           model.current_recs = {}
       model.current_recs[dimension.id] = potential_recs.filter(rec =>dimension.score < rec.to)
       // console.log(potential_recs)
       // console.log(model.current_recs)
   }

   const applyRecommendationsToQuestions = (model, question_id) =>{
       
  }

   const computeOverallScores = (model) =>{
        model.questionnaire.forEach(dim =>{
          // Compute average of the scores of each question of the dimension
          dim.score = dim.questions.map(q => q.value).reduce((a, b) => a + b, 0)/dim.questions.length
        })
    
  }
   // const doOnCurrentPageChanged = () => {console.log("PAGE CHANGED")}
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

   const computeRecommendations = (model, dimension) =>{
    //model.recommendations.forEach(dim => {
    //    dim.questions = dim.questions.map(q => {return {value:3,...q}})
    //})
    return [{"text": "This is a recommendation "}, {"text": "This is yet another recommendation "}]
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
   console.log(model)
   const data = [
    {
      "dimension": "growth management",
      "your score": 45,
      "average": 27,
    },
    {
      "dimension": "go international",
      "your score": 26,
      "average": 28,
    },
    {
      "dimension": "financing",
      "your score": 60,
      "average": 47,
    },
    {
      "dimension": "ecosystem",
      "your score": 21,
      "average": 100,
    },
    {
      "dimension": "collaborating with HEI",
      "your score": 100,
      "average": 74,
    }
  ]


  const [value, setValue] = React.useState(5);
  const onChange = (event) => setValue(event.target.value);
  
    return <Box align="center">
       <Heading selfAlign="center">Tool</Heading>
       <Tabs>
       <Tab title="SME description">
        <Box pad="medium">   
            <Text>Sector</Text>    
        <Select
            options={['Intelligent Energy', 'Smart Cities', 'Other']}
            value={value}
            onChange={({ option }) => setValue(option)}
            />
        <Text>Number of employees</Text>    
         <Select
            options={['0-5', '5-100', '100-1000']}
            value={value}
            onChange={({ option }) => setValue(option)}
            />
            </Box>
        </Tab>
        {model.questionnaire.map( dimension =>{
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
        <Tab title="Results">
            <Box height="900" 
            width="1000" fill={true} align="center">
        <Radar
            height={500} 
            width={600}
            data={data}
            keys={[ 'your score', 'average' ]}
            indexBy="dimension"
            valueFormat=">-.2f"
            margin={{ top: 70, right: 150, bottom: 40, left: 150}}
            borderColor={{ from: 'color' }}
            gridLabelOffset={36}
            dotSize={10}
            dotColor={{ theme: 'background' }}
            dotBorderWidth={3}
            colors={{ scheme: 'nivo' }}
            blendMode="multiply"
            motionConfig="wobbly"
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    translateX: -100,
                    translateY: -120,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemTextColor: '#999',
                    symbolSize: 12,
                    symbolShape: 'circle',
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
        <Button primary label="submit" />
        </Box>

        </Tab>
        <Tab title="Recommendations" >
            <Accordion>
            {model.questionnaire.map( dimension =>{
                return <AccordionPanel label={dimension.title} key={dimension.id}>
                        { model.current_recs[dimension.id].map( rec => {
                          return <Box pad="medium" background="light-2" key={rec.id} width="large">
                             <ReactMarkdown>{rec.text}</ReactMarkdown>
                          </Box>
                        })}
                  </AccordionPanel>
            })}
          </Accordion>
        </Tab>
    </Tabs>
    </Box>;
  }