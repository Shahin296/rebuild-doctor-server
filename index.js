const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(cors())
app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.60vos.mongodb.net/doctorPortal?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.get("/", (req, res)=>{
    res.send("hello welcome to server side")
})



client.connect(err => {
  const appointmentCollection = client.db("doctorPortal").collection("userAppointments");
  
 app.post("/appointment", (req, res)=>{
    const appointments = req.body;
    appointmentCollection.insertOne(appointments)
    .then(result =>{
        res.send(result.acknowledged)
    })
     
 })

 app.post("/appointmentByDate", (req, res)=>{
   const selectedDate = req.body;
   console.log(selectedDate.date)
   appointmentCollection.find({date: selectedDate.date})
   .toArray((err, documents)=>{
      console.log(documents)
      res.send(documents)
   })
 })

  console.log("database connected")
});

app.listen(process.env.PORT || "5000")