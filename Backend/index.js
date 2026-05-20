import express from 'express';
import cors from 'cors';
import { products } from './products.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let users = [];

app.get('login', (req,res) => {
    const user = req.body.user;

    for(let i = 0;i < users.length;i++){
        if(users[i].email == user.email && users[i].password == user.password){
           return res.json(true)
        }
    }
    return res.json(false);
});

app.push('registration', (req,res) => {
   const user = req.body.user;
   users.push(user);

   return res.json(user);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
