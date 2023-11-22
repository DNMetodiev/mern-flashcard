import express, { Request, Response } from "express";
import mongoose, { get } from "mongoose";

import { config } from "dotenv";
config();
import cors from "cors";
import Deck from "./models/Deck";
import { getDecksController } from "./controllers/getDecksController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardForDeckController } from "./controllers/createCardForDeckController";
import { getDeckController } from "./controllers/getDeckController";

const PORT = 5000;

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.get('/decks', getDecksController);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);
app.get("/decks/:deckId", getDeckController);
app.post("/decks/:deckId/cards", createCardForDeckController);

const db = mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Connected to ${PORT}`);
  app.listen(PORT);
});

