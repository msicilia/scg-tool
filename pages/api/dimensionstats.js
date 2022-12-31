
import dimensions from '../../json/dimensions.json'
import { addToAverage } from '../../util';
import fs from 'fs';

// in-memory state for the API 
let stats = {
       dimensions: dimensions.map(d =>({...d, average: 75, count: 0}))
}

export default function handler(req, res) {
  const { method } = req;
  // just return the complete stats.
  if (method === "GET") {
    return res.status(200).json(stats);
  }

  // requires an object that contains all the scores per each dimension of the submission.
  if (method === "POST") {
    const submission = JSON.parse(req.body)
    stats.dimensions = stats.dimensions.map(d =>({...d, 
                                                  count: d.count + 1, 
                                                  average: addToAverage(d.average, 
                                                                        d.count + 1 , 
                                                                        submission.filter(s=>s.id===d.id)[0].score)}))
   fs.writeFile("./json/dimensions.json", JSON.stringify(stats.dimensions), 
    function(err) {
      if (err) {
          console.log(err);
      }
    });
    return res.status(200).json([])
  }
}

