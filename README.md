
# SME Cluster Growth assessment tool
<p float="left">
<img src="public/mitlicense.png" width="67"/>
<img src="public/oer.jpeg" width="100"/>
</p>

This is a [SME Cluster Growth](https://smeclustergrowth.eu/) open educational resource (OER) aimed at the self-assessment of the limitations and bottlenecks of SME in their growth. 

The dimensions, questions and recommendations are the result of the work in the SME Cluster Growth Erasmus+ project.

## Using the OER as is

You can use the OER as is by deploying it to any local or Internet available server. The tool does not provide any sort of authentication, so that an instance deployed as is openly can be used by anybody that have the URL. 

The tool is intended to be used within the process of training or mentoring of SMEs, and not as a long-term database or service. This is why ideally, the OER should be deployed per each training program. However, you can integrate the tool in your Learning Management System (LMS) or other by developing the integration.

## Limitations

The tool does not record the responses to the questionnaire, it only stores in memory as server state and in JSON files the following:
- Overall counts of questionnaires submitted per country, to give information for the `WorldMapView` component in the front page.
- Averages of the scores per dimension, to show the averages in the `Radar` component in the results tab. 

Both elements of shared state are handled in the Next.js `api` folder. 

The tool does not use any form of database or server-side persistent storage beyond saving in files the above. This has the problem that it works in `dev` mode, since it autoreloads components using "fast refresh" when the files are updated. But it won't do it in normal production mode, that will requiere storing the above in some form of database and include some reload functionality. 

## Development

The OER has been developed using the [Next.js 12](https://nextjs.org/) framework, and can be extended, modified or repurposed with the tools provided by the framework or compatible. We have used a permissive open source license to allow for that. 

## Deploy on Vercel

You can easily deploy the OER as is in Vercel (or any other similar free service as Netlify) by forking the Github repo to your Github account and associating your fork with your Vercel account. However, since the free Vercel hosting does not provide storage, it will not record correctly the averages and countings of the responses. 

## Self hosting

The tool can be deployed at any hosting. Doing so requires having [node.js](https://nodejs.org/) installed (the tool was tested with v12.22.9). 

Just clone the repo and execute inside the main folder.

```
npm install
```
Then you can build the app with:
```
npm run build
```

And finally you can start the server with:
```
npm run dev
```

