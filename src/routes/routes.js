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
  const cpf = req.params.cpf
  const response = await req.dbConnection
    .collection("records")
    .findOne({cpf});
  res.json({data:response});
});


export default router;
