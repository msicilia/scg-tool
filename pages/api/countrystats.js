
import countries from '../../json/countries.json'
import fs from 'fs';

// in-memory state for the API (warning: no persistence)
let stats = {
  countries: countries
}

export default function handler(req, res) {
  const { method } = req;
  // just return the complete stats.
  if (method === "GET") {
    return res.status(200).json(stats.countries);
  }

  // requires an object with a location property that must be one of the
  // locations in stats.countries.
  if (method === "POST") {
    const body = JSON.parse(req.body)
    const { location } = body;
    console.log(location)
    
    // increment the count for the given location (country) and update total.
    stats.countries = stats.countries.map(
            (loc)=> loc.name === location || loc.name === "Total"
               ?  {...loc, count:loc.count + 1}
               : loc  );
    console.log(stats.countries)
    fs.writeFile("./json/countries.json", JSON.stringify(stats.countries), function(err) {
                if (err) {
                    console.log(err);
                }
            });
            
    return res.status(200).json([])
  }
}
