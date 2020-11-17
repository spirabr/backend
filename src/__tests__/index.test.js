import request from "supertest";

import { app } from "../app";
import { setupDb } from "../db/mongoConnection";
import { mockedSamples } from "../__fixtures__";

describe("'/' route handlers", () => {
  let db;

  beforeAll(async () => {
    db = await setupDb();

    await db.createCollection("samples");

    return db;
  });

  beforeEach(async () => {
    await db.collection("samples").drop();

    await db.createCollection("samples");

    await db.collection("samples").insertMany(mockedSamples);
  });

  afterAll(async () => {
    await db.collection("samples").drop();
    db.close();
  });

  it("GET should return all samples", async () => {
    const { body } = await request(app).get("/");

    expect(body.data).toEqual([
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
        timeStamp: "2020-05-10T00:00:00.000Z",
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
        timeStamp: "2020-04-20T00:00:00.000Z",
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
        timeStamp: "2020-05-30T00:00:00.000Z",
      },
    ]);
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

  it("POST should return status code 400 if input is invalid", async () => {
    const { status } = await request(app)
      .post("/")
      .send({
        patientId: "",
        collector: { hospital: "Test" },
      });

    expect(status).toBe(400);
  });
});

describe("'/:patientId' route handlers", () => {
  let db;

  beforeAll(async () => {
    db = await setupDb();

    await db.createCollection("samples");

    return db;
  });

  beforeEach(async () => {
    await db.collection("samples").drop();

    await db.createCollection("samples");

    await db.collection("samples").insertMany(mockedSamples);
  });

  afterAll(async () => {
    await db.collection("samples").drop();
    db.close();
  });

  it("GET should return valid sample", async () => {
    const { body, status } = await request(app).get("/9124192448");

    expect(status).toBe(200);
    expect(body.response).toEqual({
      patientId: "9124192448",
      collector: {
        name: "Vinicius",
        hospital: "Albert Einstein",
      },
      audioUrl1: "",
      audioUrl2: "",
      audioUrl3: "",
      audioUrl4: "",
      timeStamp: "2020-05-10T00:00:00.000Z",
    });
  });

  it.todo("PATCH should return updated sample");

  it.todo("DELETE should return deleted sample");
});
