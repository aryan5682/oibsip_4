const express=require('express');
const cors =require('cors');
const Connection=require('./Database/db')

const Routes =require('./Routes/routes')
const dotenv=require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();
const PORT=process.env.PORT;
const app = express();
Connection();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.use('/api/users',Routes)
app.listen(PORT,()=>console.log(`Your server is Start on Port ${PORT}`))