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
    CREATE TABLE IF NOT EXISTS Tournaments (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        name        TEXT NOT NULL,
        place       TEXT NOT NULL,
        price       REAL NOT NULL DEFAULT 0.0,
        start_time  TEXT NOT NULL,
        description TEXT,
        picture     TEXT
    );
`);

await db.exec(`
    INSERT INTO Tournaments (name, place, price, start_time, description, picture) VALUES 
    ('Grand Beach Open 2026', 'Wien, Donauinsel', 25.00, '2026-07-15 10:00', 'Das größte Beachvolleyball-Event des Sommers auf der Donauinsel.', 'https://example.com/logos/vienna.png'),
    ('Masters Cup', 'Salzburg', 0.00, '2026-07-22 09:00', 'Ein hochklassiges Turnier für Profis und Amateure. Eintritt frei!', NULL),
    ('Challenger Series', 'Graz', 15.00, '2026-08-05 11:30', 'Punkte sammeln für die Rangliste bei der Challenger Series.', 'https://example.com/logos/graz.png'),
    ('Summer Slam', 'Klagenfurt', 30.00, '2026-08-19 08:00', 'Der legendäre Summer Slam am Wörthersee.', NULL);
`);

await db.exec(`
    INSERT INTO Matches (teamA, teamB, scoreA, scoreB, date) VALUES 
    ('Sabo',  'Valo',   '23|23|19', '25|25|25', '2025-01-07'),
    ('Kuro',  'Shiro',  '15|25|21', '25|18|23', '2025-01-07'),
    ('Akuma', 'Tenshi', '25|25',    '12|19',    '2025-01-14'),
    ('Sabo',  'Kuro',   '22|25|14', '25|20|16', '2025-01-14');
`);

const newsData = [
    "https://volleyball-insider.com/wp-content/uploads/2026/06/deutschland-vnl-zdf-livestream-1024x577.jpg",
    "https://www.volleynet.at/cms/wp-content/uploads/2025/06/2000.jpeg",
    "https://sportsbusiness.at/wp-content/uploads/2024/01/oevv-volleyball-win2day-beach-volleyball-FOTO-%C3%A9-Gert-Nepel.jpg"
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

app.get('/tournaments', async (req, res) => {
    const { search } = req.query;

    try {
        let tournaments;
        if (search) {
            const searchQuery = `%${search}%`;
            tournaments = await db.all(
                `SELECT * FROM Tournaments WHERE name LIKE ? OR place LIKE ?`,
                [searchQuery, searchQuery]
            );
        } else {
            tournaments = await db.all(`SELECT * FROM Tournaments`);
        }

        return res.json({ ok: true, tournaments });
    } catch (err) {
        return res.status(500).json({ ok: false, message: err.message });
    }
});

// NEU: Ein einzelnes Turnier anhand seiner ID abrufen (z.B. /tournaments/1)
app.get('/tournaments/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const tournament = await db.get(`SELECT * FROM Tournaments WHERE id = ?`, [id]);

        if (!tournament) {
            return res.status(404).json({ ok: false, message: 'Turnier nicht gefunden' });
        }

        return res.json({ ok: true, tournament });
    } catch (err) {
        return res.status(500).json({ ok: false, message: err.message });
    }
});

app.post('/registration', async (req,res) => {
    try{
   const user = req.body.user || req.body;

   if (!user || !user.fullname) {
            return res.status(400).json({ 
                success: false, 
                message: "Registrierung fehlgeschlagen: Keine Benutzerdaten empfangen." 
            });
        }
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
   } catch (error) {
        console.error("Datenbankfehler bei Registration:", error);
        
        // HIER: Prüfen, ob der Fehler von der doppelten E-Mail kommt
        if (error.message && error.message.includes("UNIQUE constraint failed: Users.email")) {
            return res.status(400).json({ 
                success: false, 
                message: "Diese E-Mail-Adresse wird bereits verwendet." 
            });
        }

        // Für alle anderen unerwarteten Fehler
        return res.status(500).json({ success: false, message: "Server- oder Datenbankfehler." });
    }
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
