import express from "express";
import {
  getAll,
  createSample,
  getSampleByPatientId,
  updateSample,
  deleteSampleByPatientId,
} from "../controllers/samples.js";
import mongoMiddleware from "../db/mongoConnection.js";

const router = express.Router();

router.get("/", mongoMiddleware, getAll);

router.post("/", mongoMiddleware, createSample);

router.get("/:patientId", mongoMiddleware, getSampleByPatientId);

router.patch("/:patientId", mongoMiddleware, updateSample);

router.delete("/:patientId", mongoMiddleware, deleteSampleByPatientId);

export default router;
