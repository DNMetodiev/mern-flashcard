import express, { Request, Response } from "express";
import mongoose, { get } from "mongoose";

import { config } from "dotenv";
config();
import cors from "cors";
import Deck from "./models/Deck";
import { getDecksController } from "./controllers/getDeckController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";

const PORT = 5000;

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.get('/decks', getDecksController);

app.post("/decks", createDeckController);

app.delete("/decks/:deckId", deleteDeckController);


const db = mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Connected to ${PORT}`);
  app.listen(PORT);
});

