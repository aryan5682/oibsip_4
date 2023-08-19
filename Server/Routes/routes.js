const express=require('express');
const route=express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { addTodo, userSign, login, customAuthHeader } = require('../controller/todo-controller');
const {User}=require('../model/user')
const Todo =require('../model/Todo');
route.use(bodyParser.json());
// route.post('/todos',addTodo);

route.post('/',userSign);
route.post('/login',login);
// Assuming you have the necessary setup and imports

// Middleware to verify tokens and extract user info
const authMiddleware = (req, res, next) => {
   
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');
    
    try {
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).send('Invalid token.');
    }
  };
  
  // Create a new to-do item
  route.post('/todos', authMiddleware, async (req, res) => {
    const userId = req.user._id;
    const { data } = req.body;
    const user = await User.findById(userId);
    const newTodo = new Todo({ data, owner: userId });
    if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Push the todo data into the todoitems array
      user.todoitems.push(newTodo._id);
      await user.save();
     await newTodo.save();
    
     res.status(200).send('Todo added successfully');
  });
  route.get('/gettodos', authMiddleware, async (req, res) => {
    try {
      const userId = req.user._id;
  
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Fetch all todos associated with the user

      const todoIds =user.todoitems;

    // Fetch todos based on the fetched IDs
    const todos = await Todo.find({ _id: { $in: todoIds } }).sort({'createdAt':-1});
  
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).send('Error fetching todos');
    }
  })
  route.get('/marktodo/:id', authMiddleware, async (req, res) =>{
    try{
    const userId = req.user._id;
  
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }
      const todoId =await Todo.findById(req.params.id);
      const todo=await Todo.findOneAndUpdate(
        {_id:req.params.id},
        {done:!todoId.done}
      )
      await todo.save();
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).send('Error in updating todos');
    }
  })
  // Update a to-do item
  route.put('/todos/:id', authMiddleware, async (req, res) => {
    try{
    const userId = req.user._id;
    
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }
      await Todo.findOneAndUpdate(
        {_id:req.params.id},
        {data:req.body.data}
      )
     
  
      const todo=await Todo.findById(req.params.id)
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).send('Error in updating todos');
    }
   
  });
  
  // Delete a to-do item
  route.delete('/todos/:id', authMiddleware, async (req, res) => {
    try{
      const userId = req.user._id;
      
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).send('User not found');
      }
      user.todoitems = user.todoitems.filter(id => id.toString() !==req.params.id);
      await user.save();
       const todo=await Todo.findByIdAndDelete(req.params.id);
      
        
        res.status(200).json(todo);
      } catch (error) {
        res.status(500).send('Error in updating todos');
      }
  });
  

module.exports=route;