import request from "supertest";

import { app } from "../app";
import { setupDb } from "../db/mongoConnection";

describe("'/' route handlers", () => {
  let db;

  beforeAll(async () => {
    db = await setupDb();

    return db;
  });

  beforeEach(async () => {
    await db.collection("samples").drop();

    await db.createCollection("samples");

    await db.collection("samples").insertMany([
      {
        patientId: "9124192448",
        collector: {
          name: "Vinicius",
          hospital: "Albert Einstein",
        },
        audioUrl1: "",
        audioUrl2: "",
        audioUrl3: "",
        audioUrl4: "",
      },
      {
        patientId: "9124191240",
        collector: {
          name: "Ricardo",
          hospital: "Albert Einstein",
        },
        audioUrl1: "",
        audioUrl2: "",
        audioUrl3: "",
        audioUrl4: "",
      },
      {
        patientId: "9124112440",
        collector: {
          name: "Thais",
          hospital: "Albert Einstein",
        },
        audioUrl1: "",
        audioUrl2: "",
        audioUrl3: "",
        audioUrl4: "",
      },
    ]);
  });

  afterAll(async () => db.close());

  it("GET should return all samples", async () => {
    const { body } = await request(app).get("/");

    const mockedSamples = [
      {
        patientId: "9124192448",
        collector: {
          name: "Vinicius",
          hospital: "Albert Einstein",
        },
        audioUrl1: "",
        audioUrl2: "",
        audioUrl3: "",
        audioUrl4: "",
      },
      {
        patientId: "9124191240",
        collector: {
          name: "Ricardo",
          hospital: "Albert Einstein",
        },
        audioUrl1: "",
        audioUrl2: "",
        audioUrl3: "",
        audioUrl4: "",
      },
      {
        patientId: "9124112440",
        collector: {
          name: "Thais",
          hospital: "Albert Einstein",
        },
        audioUrl1: "",
        audioUrl2: "",
        audioUrl3: "",
        audioUrl4: "",
      },
    ];

    expect(body.data).toEqual(mockedSamples);
  });

  it("POST should return created sample", async () => {
    const { body, status } = await request(app)
      .post("/")
      .send({
        patientId: "12334",
        collector: { name: "SPIRA test", hospital: "Test" },
      });

    expect(status).toBe(201);

    expect(body.response).toEqual({
      patientId: "12334",
      collector: { name: "SPIRA test", hospital: "Test" },
      audioUrl1: "",
      audioUrl2: "",
      audioUrl3: "",
      audioUrl4: "",
    });
  });

  it.todo("POST should return 401 if input is invalid");
});

describe("'/:patientId' route handlers", () => {
  it.todo("GET should return valid sample");
  it.todo("PATCH should return updated sample");
  it.todo("DELETE should return deleted sample");
});
