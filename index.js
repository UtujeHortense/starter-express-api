//create express server

//publish online

//call db for update

'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const PORT = 8080;
const HOST = 'https://easy-blue-cod-toga.cyclic.app';

//App
const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//MongoDB
const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace the placeholders with your credentials and hostname
const uri = "mongodb+srv://mypiso:i1tmMjT1HFDutT7o@pisoplannercluster0.bap6afz.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("PisoIndexes").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    //app.listen(PORT, HOST);
    app.listen(PORT, function () {
      console.log("Server listening");
    });
    console.log(`Running on ${HOST}`);
  } catch {
    console.log("Error connecting to MongoDB");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
    console.log("leaving run")
  }
}
run().then(data => console.log(data)).catch(err => console.log(err));

app.get('/', (req,res) => {
    res.send("Hello, server is running ...")
});

app.get('/getindexes', async(req, res) => {
    //connect to dabase extract all indexes
    const db = await client.db('PisoIndexes');
    const collection = await db.collection("pairs");
    const query = { name: "index" };
    const doc = await collection.findOne(query);
    res.send(doc)
})

app.post('/setindexes', async (req, res) => {
    //update indexes in database
    let db = await client.db('PisoIndexes');
    let collection = await db.collection("pairs");
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
    res.send(result)

})


//exports.app = app;
exports.app = app;
