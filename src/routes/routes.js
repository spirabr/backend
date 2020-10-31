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

router.get("/:patientId", mongoMiddleware, async (req, res) => {
  const patientId = req.params.patientId;

  const response = await req.dbConnection
    .collection("samples")
    .findOne({ patientId });

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

router.patch("/:patientId", mongoMiddleware, async (req, res) => {
  const patientId = req.params.patientId;
  const collector = req.body.collector;

  const sample = await req.dbConnection
    .collection("samples")
    .findOne({ patientId });

  if (!sample) {
    res.status(404).send(`Patient ${patientId} does not exist on database.`);
  }

  if (!collectorIsValid(collector)) {
    res.status(400).send("Collector data is invalid.");
  }

  try {
    const response = await req.dbConnection
      .collection("samples")
      .updateOne(
        { patientId: patientId },
        { $set: { collector: collector } },
        { upsert: true }
      );

    res.status(200).json({ response: response });
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
