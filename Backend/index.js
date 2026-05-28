import express from 'express';
import cors from 'cors';
import path from 'path'
import fs from 'fs'
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { log } from 'console';

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

await db.exec(`
    INSERT INTO Matches (teamA, teamB, scoreA, scoreB) VALUES 
    ('Sabo', 'Valo', '23|23|19', '25|25|25'),
    ('Kuro', 'Shiro', '15|25|21', '25|18|23'),
    ('Akuma', 'Tenshi', '25|25', '12|19'),
    ('Sabo', 'Kuro', '22|25|14', '25|20|16');
`);

const matchesData = {
 matchA : {teamA: "Sabo", teamAScore: "23|23|19", teamB: "Valo", teamBScore: "25|25|25"},
 matchB : {teamA: "Sabo", teamAScore: "23|23|19", teamB: "Valo", teamBScore: "25|25|25"}
}
const newsData = [
    "https://picsum.photos/id/10/600/350",
    "https://picsum.photos/id/11/600/350",
    "https://picsum.photos/id/12/600/350"
];

app.post('/login', (req,res) => {
    const user = req.body.user;

    const sql = `SELECT * FROM Users WHERE email == ? AND password == ?`;
    db.run(sql,user.email,user.password);
    return res.json(false);
});

app.post('/registration', (req,res) => {
   const user = req.body.user;
   const sql = `
            INSERT INTO Users (username, email, password, country, birthdate) 
            VALUES (?, ?, ?, ?, ?)
        `;

        await db.run(sql, [
            user.fullname, 
            user.email, 
            user.password, 
            user.country, 
            user.birthdate
        ]);
    console.log("User: "+user)
   return res.json({ success: true, message: "Registrierung erfolgreich!", user });
});

app.get('/match/:week', (req,res) => {
    const next = req.query.week;

    return res.json(matchesData);
});

app.get('/news', (req,res) => {
    return res.json(newsData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
