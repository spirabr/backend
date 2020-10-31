import express from "express";
import mongoMiddleware from "../db/mongoConnection.js";

const router = express.Router();

router.get("/", mongoMiddleware, async (req, res) => {
  const response = await req.dbConnection
    .collection("samples")
    .find({})
    .toArray();

  res.json({ data: response });
});

router.get("/:cpf", mongoMiddleware, async (req, res) => {
  const cpf = req.params.cpf;

  const response = await req.dbConnection
    .collection("samples")
    .findOne({ cpf });

  res.json({ data: response });
});

router.post("/", mongoMiddleware, async (req, res) => {
  const { patientId, collector } = req.body;

  if (!patientId || !collectorIsValid(collector)) {
    res.status(400).send("Patient id or collector data is invalid.");
  }

  const sample = {
    patientId: patientId,
    collector: collector,
    audioUrl1: "",
    audioUrl2: "",
    audioUrl3: "",
    audioUrl4: "",
  };

  try {
    const response = await req.dbConnection
      .collection("samples")
      .insertOne(sample);

    res.status(201).json({ response: response });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.patch("/:cpf", mongoMiddleware, async (req, res) => {
  const cpf = req.params.cpf;
  const name = req.body.name;
  const email = req.body.email;
  const age = req.body.age;
  const gender = req.body.gender;

  try {
    const response = await req.dbConnection
      .collection("samples")
      .updateOne(
        { cpf: cpf },
        { $set: { name: name, email: email, age: age, gender: gender } },
        { upsert: true }
      );
    res.json({ Response: response });
  } catch (err) {
    res.status(404).json(err.message);
  }
});

router.delete("/:cpf", mongoMiddleware, async (req, res) => {
  const cpf = req.params.cpf;

  try {
    const response = await req.dbConnection
      .collection("samples")
      .deleteOne({ cpf: cpf });
    res.json({ Response: response });
  } catch (err) {
    res.status(404).json(err.message);
  }
});

function collectorIsValid(collector) {
  return collector && collector.name && collector.hospital;
}

export default router;
