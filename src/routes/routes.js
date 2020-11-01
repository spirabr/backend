import express from "express";
import mongoMiddleware from "../db/mongoConnection.js";

const router = express.Router();

router.get("/", mongoMiddleware, async (req, res) => {
  const response = await req.dbConnection
    .collection("samples")
    .find({})
    .toArray();

  res.status(200).json({ data: response });
});

router.get("/:patientId", mongoMiddleware, async (req, res) => {
  const patientId = req.params.patientId;

  const response = await req.dbConnection
    .collection("samples")
    .findOne({ patientId });

  res.status(200).json({ data: response });
});

router.post("/", mongoMiddleware, async (req, res) => {
  const { patientId, collector } = req.body;

  if (!patientId || !collectorIsValid(collector)) {
    res.status(400).send("Patient id or collector data is invalid.");
    return;
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
  const { collector, audioUrl1, audioUrl2, audioUrl3, audioUrl4 } = req.body;

  const sample = await req.dbConnection
    .collection("samples")
    .findOne({ patientId });

  if (!sample) {
    res.status(404).send(`Patient ${patientId} does not exist on database.`);
    return;
  }

  const updatesFromBody = {
    collector: {
      name:
        collector && collector.name ? collector.name : sample.collector.name,
      hospital:
        collector && collector.hospital
          ? collector.hospital
          : sample.collector.hospital,
    },
    audioUrl1,
    audioUrl2,
    audioUrl3,
    audioUrl4,
  };

  try {
    const response = await req.dbConnection
      .collection("samples")
      .updateOne(
        { patientId: patientId },
        { $set: getSampleUpdateObj(updatesFromBody) },
        { upsert: true }
      );

    res.status(200).json({ response: response });
  } catch (err) {
    res.status(404).json(err.message);
  }
});

router.delete("/:patientId", mongoMiddleware, async (req, res) => {
  const patientId = req.params.patientId;

  try {
    const response = await req.dbConnection
      .collection("samples")
      .deleteOne({ patientId });

    res.status(200).json({ response: response });
  } catch (err) {
    res.status(404).json(err.message);
  }
});

function collectorIsValid(collector) {
  return collector && collector.name && collector.hospital;
}

function getSampleUpdateObj(updatesFromBody) {
  return Object.entries(updatesFromBody).reduce((acc, [key, value]) => {
    if (value) acc[key] = value;

    return acc;
  }, {});
}

export default router;
