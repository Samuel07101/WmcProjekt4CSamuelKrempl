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
    CREATE TABLE IF NOT EXISTS Licences(
        id      INTEGER PRIMARY KEY AUTOINCREMENT,
        name    VARCHAR2(50) NOT NULL,
        price   DECIMAL(10,2) NOT NULL
    );
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS UserLicence(
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id     INTEGER NOT NULL,
        licence_id  INTEGER NOT NULL,
        FOREIGN KEY (user_id)    REFERENCES Users(id),
        FOREIGN KEY (licence_id) REFERENCES Licences(id)
    );
`);
await db.exec(`
    CREATE TABLE IF NOT EXISTS Matches(
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    teamA   VARCHAR2(10) NOT NULL,
    teamB   VARCHAR2(10) NOT NULL,
    scoreA  VARCHAR2(30) NOT NULL,
    scoreB  VARCHAR2(30) NOT NULL,
    date    DATE NOT NULL
    );
`);

await db.exec(`
    INSERT INTO Matches (teamA, teamB, scoreA, scoreB, date) VALUES 
    ('Sabo',  'Valo',   '23|23|19', '25|25|25', '2025-01-07'),
    ('Kuro',  'Shiro',  '15|25|21', '25|18|23', '2025-01-07'),
    ('Akuma', 'Tenshi', '25|25',    '12|19',    '2025-01-14'),
    ('Sabo',  'Kuro',   '22|25|14', '25|20|16', '2025-01-14');
`);

const newsData = [
    "https://picsum.photos/id/10/600/350",
    "https://picsum.photos/id/11/600/350",
    "https://picsum.photos/id/12/600/350"
];
app.post('/login', async (req,res) => {
    const user = req.body.user;
    const sql = `SELECT * FROM Users WHERE email = ? AND password = ?`;
    const foundUser = await db.get(sql, [user.email, user.password]);

    if (foundUser) {
        return res.json({ success: true, user: foundUser });
    } else {
        return res.json({ success: false, message: "Falsche E-Mail oder Passwort" });
    }
});

app.post('/registration', async (req,res) => {
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

app.get('/match/:week', async (req, res) => {
    const week = parseInt(req.params.week) || 1;
    const offset = (week - 1) * 2;

    try {
        const matches = await db.all(
            `SELECT * FROM Matches LIMIT 2 OFFSET ?`,
            [offset]
        );

        if (matches.length === 0) {
            return res.status(404).json({ ok: false, message: 'Keine Spiele für diese Woche' });
        }

        return res.json({
            ok: true,
            matches: {
                matchA: matches[0],
                matchB: matches[1] ?? null
            }
        });
    } catch (err) {
        return res.status(500).json({ ok: false, message: err.message });
    }
});

app.get('/news', async (req,res) => {
    return res.json(newsData);
});

app.put('/user', async (req,res) => {
    const user = req.body;
    const sql = `
            UPDATE Users 
            SET username = ?, email = ?, password = ?, country = ?, birthdate = ?
            WHERE id = ?
        `;

        const result = await db.run(sql, [
            user.username, 
            user.email,
            user.password,
            user.country,
            user.birthdate,
            user.id
        ]);
    
        if (result.changes === 0) {
            return res.status(404).json({ success: false, message: "Benutzer nicht gefunden." });
        }

        return res.json({ success: true, message: "Benutzer erfolgreich aktualisiert!",});
});

app.get('/tournament', async (req, res) => {
    const { id } = req.query;
    const sql = `SELECT * FROM Matches WHERE id = ?`;

    try {
        const result = await db.get(sql, [id]);

        if (!result) {
            return res.status(404).json({ ok: false, message: 'Turnier nicht gefunden' });
        }

        return res.json({ ok: true, result });
    } catch (err) {
        return res.status(500).json({ ok: false, message: err.message });
    }
});

app.post('/licence', async (req, res) => {
    const { user, licence } = req.body;

    try {
        await db.run(
            `INSERT INTO UserLicence (user_id, licence_id, bought_at)
             VALUES (?, ?, DATE('now'))`,
            [user.id, licence.id]
        );

        res.status(201).json({ok: true});
    } catch (err) {
        res.status(500).json({ok: false});
    }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
