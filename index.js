//create express server

//publish online

//call db for update

'use strict';
const express = require('express');
const cors = require('cors');
//const fetch = require('node-fetch');
const bodyParser = require('body-parser');
//const open = require('open')
const MongoClient = require('mongodb').MongoClient;

const PORT = 8080;
const HOST = 'localhost';
//App
const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', (req,res) => {
    res.send("Hello, server is running ...")
});

app.get('/getindexes', async(req, res) => {
    //connect to dabase extract all indexes
    
    const uri = "mongodb+srv://mypiso:i1tmMjT1HFDutT7o@pisoplannercluster0.bap6afz.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    const db = client.db('PisoIndexes');
    const collection = await db.collection("pairs");
    const query = { name: "index" };
    const doc = await collection.findOne(query);
    res.send(doc)
})

app.post('/setindexes', async (req, res) => {
    //update indexes in database
    const uri = "mongodb+srv://mypiso:i1tmMjT1HFDutT7o@pisoplannercluster0.bap6afz.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    const db = client.db('PisoIndexes');
    const collection = await db.collection("pairs");
    // create a filter for a movie to update
    const filter = { name: "index" };
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };
    // create a document that sets the plot of the movie
    const updateDoc = {
      $set: {
        indexA: req.body.indexA,
        indexB: req.body.indexB,
        indexC: req.body.indexC,
      },
    };
    const result = await collection.updateOne(filter, updateDoc, options);

})
//app.listen(PORT, HOST);
app.listen(PORT, function () {
    console.log("server listening on port "+PORT+ "...");
});
console.log(`Running on http://${HOST}:${PORT}`);

//exports.app = app;
exports.app = app;
