const express=require('express');
const bodyParser=require('body-parser');
// const cookieParser=require('cookie-parser');
const dotenv=require('dotenv');
const cors=require('cors');
const { MongoClient, ServerApiVersion }=require('mongodb');
const router=require('./route/api')



dotenv.config();
// import Connection from './db';
// Const Connection=require('./db')
const app=express();
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
// app.use(cookieParser());
// app.params(req.params)
app.use(router)
//     next()
// }  ,router);
// app.get('/',(req,res)=>{
//     res.status(200).json("Hello")
// })
// Connection();
// app.post("/signup",f.createUser);


const uri = "mongodb+srv://rohitraj123:mongodb@cluster0.icu7xdh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


const PORT=process.env.PORT || 6007;
app.listen(3000);
