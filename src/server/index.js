const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const fetch = require('node-fetch')
const mockAPIResponse = require('./mockAPI.js');
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

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

/*app.post("/text", postText);

async function postText (req, res) {
    const input = req.body.input;
    return text = input;
}*/

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

/*app.get("/data", updateUI);

async function updateUI (req, res) {
    // API url
    const response = await fetch (`https://api.meaningcloud.com/sentiment-2.1?key=${textapi}&lang=en&txt=plain&url=${text}&model=general`)
        if (response.status != 200) {
            window.alert("MeaningCLoud isn't responding!");
        }
    const data = await response.json(); 
    res.send(data); 
}*/

app.post('/analyze', function(req, res){
    const API_KEY = process.env.API_KEY;//b93ed6bf4022aa7a73a5cba3f156db96
    const textUrl = req.body.textUrl;

    const baseUrl = "https://api.meaningcloud.com/sentiment-2.1"
    const para = `?key=${API_KEY}&lang=en$model=general$url=${textUrl}`;
    const urlToFetch = baseUrl + para;

    fetch(urlToFetch, {
        method: "POST",
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
        })

    })
})