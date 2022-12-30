
import dimensions from '../../json/dimensions.json'

// in-memory state for the API (warning: no persistence)
let stats = {
       dimensions: dimensions.map(d =>({...d, average: 75, count: 0}))
}

function addToAverage( average, size, value)
{
    return (size * average + value) / (size + 1);
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
                                                  average: addToAverage(d.average, d.count + 1 , submission.filter(s=>s.id===d.id)[0].score)}))
    return res.status(200).json([])
  }
}

