const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const fetch = require('node-fetch')
const mockAPIResponse = require('./mockAPI.js');
//const baseUrl = "https://api.meaningcloud.com/sentiment-2.1"
//const API_KEY = process.env.API_KEY;
//const textUrl = req.body.textUrl;
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static('dist'))

//console.log(__dirname)

app.get('/', function (req, res) {
     res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})


app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


// designates what port the app will listen to for incoming requests
app.listen(8081, function () { //8081
    console.log('Example app listening on port 8081!')
})

app.post('/meaningCloud', function(req, res){
    const API_KEY = process.env.API_KEY;//b93ed6bf4022aa7a73a5cba3f156db96
    const textUrl = req.body.textUrl;

    const baseUrl = "https://api.meaningcloud.com/sentiment-2.1"
    const para = `?key=${API_KEY}&url=${req.body.textUrl}&lang=en`;
    const urlToFetch = baseUrl + para;

    fetch(urlToFetch, {
        method: "GET",
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            "Content-Type": "application/JSON",
        }
    })
    .then((response) => {
        return response.json
    })
    .then((data) => {
        console.log("meaningcloud")
        res.send({
            score_tag: data.score_tag,
            agreement: data.agreement,
            subjectivity: data.subjectivity,
            confidence: data.confidence,
            irony: data.irony,
        })

    })
})

//post request
/*app.post("/analyze", async (req, res) => {
    const textUrl = req.body.textUrl
    const response = await fetch(`?key=${API_KEY}&lang=en$model=general$url=${textUrl}`)
    const data = await response.json
        res.send(data)
    //console.log('api', para)
    //const response = await fetch(para)

    try {
        const data = await response.json
        res.send(data)
    }
    catch (error){
        console.log("error",error)
    }
})*/