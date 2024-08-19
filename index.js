const express = require('express');
const cors = require('cors');
const { ObjectId } = require('mongodb'); 
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

const corsOption = {
  origin: ["http://localhost:5173", "https://scic-job-task-client-side.vercel.app"],
  credentials: true,
  optionSuccessStatus: 200,
};         
app.use(cors(corsOption));
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zp5qruk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // await client.connect();

    const products = client.db("BrandQuest").collection("products")
    app.get("/products", async(req, res) => {
      const item = products.find()
      const result = await item.toArray();
      res.send(result)
    })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Server is running")
})

app.listen(port, () => {
   console.log("server is running") 
})