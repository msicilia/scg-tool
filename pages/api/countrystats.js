
import countries from '../../json/countries.json'

// in-memory state for the API (warning: no persistence)
let stats = {
       countries: countries
}

export default function handler(req, res) {
  const { method } = req;
  // just return the complete stats.
  if (method === "GET") {
    return res.status(200).json(stats);
  }

  // requires an object with a location property that must be one of the
  // locations in stats.countries.
  if (method === "POST") {
    const body = JSON.parse(req.body)
    const { location } = body;
    // increment the count for the given location (country) and update total.
    stats.countries = stats.countries.map(
            (loc)=> loc.name === location || loc.name === "Total"
               ?  {...loc, count:loc.count + 1}
               : loc  );
    return res.status(200).json([])
  }
}
