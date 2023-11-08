import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { config } from "dotenv";
config();
import cors from "cors";
import Deck from "./models/Deck";

const PORT = 5000;

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.get('/decks', async (req: Request, res: Response) => {
  //To do: fetch all decks
  const decks = await Deck.find({});
  res.json(decks);
});

app.post("/decks", async (req: Request, res: Response) => {
  // res.send("Hello World!");
  console.log(req.body)
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

app.delete("/decks/:deckId", async (req: Request, res: Response) => {
  //TODO - get deck ID from the url, delete the deck from the database, return the deleted deck to the user who made the reques
  const deckId = req.params.deckId;
  const deck = await Deck.findByIdAndDelete(deckId);
  res.json(deck);
});


const db = mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Connected to ${PORT}`);
  app.listen(PORT);
});

