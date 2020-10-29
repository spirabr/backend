import express from "express";
import mongoMiddleware from "../db/mongoConnection.js";

const router = express.Router();

router.get("/", mongoMiddleware, async (req, res) => {
  const response = await req.dbConnection
    .collection("records")
    .find({}).toArray();

  res.json({data:response});
});

router.get("/:cpf", mongoMiddleware, async (req, res) => {
  const cpf = req.params.cpf;
  
  const response = await req.dbConnection
    .collection("records")
    .findOne({cpf});
    
  res.json({data:response});
});

router.post("/", mongoMiddleware, async (req, res) => {
  const user = {name: req.body.name, 
    cpf: req.body.cpf, 
    email: req.body.email,
    age: req.body.age, 
    gender: req.body.gender, 
    audiourl1: "",
    audiourl2: "", 
    audiourl3: "", 
    audiourl4: ""};

  try {
  const response = await req.dbConnection
    .collection("records")
    .insertOne(user);

    res.status(201).json({Response: response});
  } catch (err) {
    res.status(404).json(err.message);
  }
  
});

router.patch("/:cpf", mongoMiddleware, async (req, res) => {
  const cpf = req.params.cpf;
  const name = req.body.name
  const email = req.body.email;
  const age = req.body.age;
  const gender = req.body.gender;

  try {
    const response = await req.dbConnection
      .collection("records")
      .updateOne({"cpf":cpf}, 
        {$set: {"name": name, "email": email, "age": age, "gender": gender}}, {upsert: true});
      res.json({Response: response});

  } catch (err) {
    res.status(404).json(err.message);
  }
});

router.delete("/:cpf", mongoMiddleware, async (req, res) => {
  const cpf = req.params.cpf;

  try {
    const response = await req.dbConnection
      .collection("records")
      .deleteOne({"cpf": cpf});
    res.json({Response: response});
  } catch (err) {
    res.status(404).json(err.message);
  }
});

export default router;
