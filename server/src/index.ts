import express, { Request, Response } from "express";
import mongoose from "mongoose";

import Deck from "./models/Deck";

const PORT = 5000;

const app = express();

app.use(express.json());



app.post("/decks", async (req: Request, res: Response) => {
  // res.send("Hello World!");
  console.log(req.body)
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});


const db = mongoose.connect(
  "mongodb+srv://flashcardsage:KIJSJUwHLUGO6yT9@cluster0.dqjq9vg.mongodb.net/?retryWrites=true&w=majority"
).then(() => {
  console.log(`Connected to ${PORT}`);
  app.listen(PORT);
});

