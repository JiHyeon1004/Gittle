var express = require('express');
var cors = require('cors');
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));
var bodyParser = require('body-parser');


const CLIENT_ID = "Iv1.922f79c332120ced";
const CLIENT_SECRET = "3b43909d7bf450b669ede8406c88e214bc51302c";

var app = express();

app.use(cors());
app.use(bodyParser.json());

//code being passed from the frontend
app.get('/getAccessToken', async function (req, res) {

    req.query.code;

    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;

    console.log(params);

    await fetch("https://github.com/login/oauth/access_token" + params, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then(data => {
        console.log(data);
        res.json(data);
    })
})


//get userData
//access token is going to be passed in as an Authorization header

app.get('/getUserData', async function (req, res) {
    req.get("Authorization"); //Bearer AccessToken
    await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization": req.get("Authorization") //Bearer AccessToken
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    })

})


app.listen(4000, function () {
    console.log("CORS server running on port 4000");
})