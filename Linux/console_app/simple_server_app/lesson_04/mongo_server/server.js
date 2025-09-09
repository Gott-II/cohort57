const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

app.use(express.json());

const mongoUrl = "mongodb://root:password@localhost:27017";

let db;
let animalsCollection;

async function start() {
    const client = new MongoClient(mongoUrl);
    try {
        await client.connect();
        console.log("✅ Erfolgreich mit MongoDB verbunden");

        db = client.db("zoo_db");
        animalsCollection = db.collection("animals");

        // Alle Tiere abrufen
        app.get("/", async (req, res) => {
            try {
                const animals = await animalsCollection.find().toArray();
                res.json(animals);
            } catch (err) {
                console.error("Fehler beim Abrufen:", err);
                res.status(500).send("Fehler beim Abrufen der Tiere");
            }
        });

        // Gewicht aller Tiere um 2 % erhöhen
        app.put("/increase-weight", async (req, res) => {
            try {
                const result = await animalsCollection.updateMany(
                    {},
                    [
                        {
                            $set: {
                                weight: { $multiply: ["$weight", 1.02] }
                            }
                        }
                    ]
                );
                res.json({
                    message: "Gewicht aller Tiere wurde um 2 % erhöht",
                    modifiedCount: result.modifiedCount
                });
            } catch (err) {
                console.error("Fehler beim Aktualisieren:", err);
                res.status(500).send("Fehler beim Erhöhen des Gewichts");
            }
        });

        app.listen(PORT, () => {
            console.log(`🚀 Server läuft unter http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Fehler bei der Verbindung zur Datenbank:", error);
    }
}

start();


// npm i - команда для обновления библиотек
// npm start - запустить приложение
// ctrl + c - остановить приложение


// npm init -y - создать package.json
// npm i express mongodb - установить библиотеки

