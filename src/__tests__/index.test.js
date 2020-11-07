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
    await db.dropDatabase(`${process.env.DB_NAME}_test`);
  });

  afterAll(async () => db.close());

  it.todo("GET should return all samples");
  it.todo("POST should return created sample");

  it.todo("POST should return 401 if input is invalid");
});

describe("'/:patientId' route handlers", () => {
  it.todo("GET should return valid sample");
  it.todo("PATCH should return updated sample");
  it.todo("DELETE should return deleted sample");
});
