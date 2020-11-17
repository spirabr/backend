function collectorIsValid(collector) {
  return collector && collector.name && collector.hospital;
}

function getSampleUpdateObj(updatesFromBody) {
  return Object.entries(updatesFromBody).reduce((acc, [key, value]) => {
    if (value) acc[key] = value;

    return acc;
  }, {});
}

export async function getAll(req, res) {
  const response = await req.dbConnection
    .collection("samples")
    .find({}, { projection: { _id: 0 } })
    .toArray();

  res.status(200).json({ data: response });
}

export async function create(req, res) {
  const { patientId, collector } = req.body;

  if (!patientId || !collectorIsValid(collector)) {
    res.status(400).send("Patient id or collector data is invalid.");
    return;
  }

  const sample = {
    patientId,
    collector,
    audioUrl1: "",
    audioUrl2: "",
    audioUrl3: "",
    audioUrl4: "",
  };

  try {
    const insertionResult = await req.dbConnection
      .collection("samples")
      .insertOne(sample);

    if (insertionResult.result.ok) {
      const { _id, ...sampleWithoutId } = sample;

      const response = sampleWithoutId;

      res.status(201).json({ response });

      return;
    }

    res.status(500).json({ error: "Could not create sample" });
  } catch (err) {
    res.status(500).json(err.message);
  }
}

export async function getSampleByPatientId(req, res) {
  const { patientId } = req.params;

  const response = await req.dbConnection
    .collection("samples")
    .findOne({ patientId });

  res.status(200).json({ data: response });
}

export async function updateSample(req, res) {
  const { patientId } = req.params;
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
        { patientId },
        { $set: getSampleUpdateObj(updatesFromBody) },
        { upsert: true }
      );

    res.status(200).json({ response });
  } catch (err) {
    res.status(404).json(err.message);
  }
}

export async function deleteSampleByPatientId(req, res) {
  const { patientId } = req.params;

  try {
    const response = await req.dbConnection
      .collection("samples")
      .deleteOne({ patientId });

    res.status(200).json({ response });
  } catch (err) {
    res.status(404).json(err.message);
  }
}
