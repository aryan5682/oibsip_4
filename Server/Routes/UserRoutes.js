const express=require('express');
const route=express.Router();
const bodyParser = require('body-parser');
const { userSign, login } = require('../controller/todo-controller');

route.use(bodyParser.json());
route.post('/todos',addTodo);

route.post('/',userSign);
route.post('/login',login);

module.exports=route;