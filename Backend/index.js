import express from 'express';
import cors from 'cors';
import path from 'path'
import fs from 'fs'
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const dbFilePath = path.join(process.cwd(), 'database.db');
if (fs.existsSync(dbFilePath)) {
    fs.unlinkSync(dbFilePath);
}

const db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database
});

await db.exec(`
    CREATE TABLE IF NOT EXISTS Users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR2(20) NOT NULL,
    email VARCHAR2(30) NOT NULL UNIQUE,
    password VARCHAR2(30) NOT NULL,
    country VARCHAR2(3) NOT NULL,
    birthdate Date NOT NULL
    );
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS Matches(
    teamA VARCHAR2(10) NOT NULL,
    teamB VARCHAR2(10) NOT NULL,
    scoreA VARCHAR2(30) NOT NULL,
    scoreB VARCHAR2(30) NOT NULL
    );
`);

const matchA = {teamA: "Sabo", teamAScore: "23|23|19", teamB: "Valo", teamBScore: "25|25|25"};
const matchB = {teamA: "Sabo", teamAScore: "23|23|19", teamB: "Valo", teamBScore: "25|25|25"};

const users = [];

app.post('/login', (req,res) => {
    const user = req.body.user;

    for(let i = 0;i < users.length;i++){
        if(users[i].email == user.email && users[i].password == user.password){
           return res.json(true)
        }
    }
    return res.json(false);
});

app.post('/registration', (req,res) => {
   const user = req.body.user;
   users.push(user);

   return res.json(user);
});

app.get('/match/:week', (req,res) => {
    const next = req.query.week;

    return res.json(matchA);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
