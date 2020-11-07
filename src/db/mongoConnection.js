import MongoClient from "mongodb";

export const setupDb = async () => {
  try {
    const connection = await MongoClient.connect(process.env.MONGODB_URL);
    const isTest = process.env.NODE_ENV === "test";

    const dbName = `${process.env.MONGODB_DATABASE_NAME}${
      isTest ? "_test" : ""
    }`;

    return connection.db(dbName);
  } catch (error) {
    console.error(error);

    throw new Error("Failed to connect to MongoDB");
  }
};

export default async (req, res, next) => {
  const dbConnection = await setupDb();

  if (!dbConnection) {
    res.status(500).send({ error: "Failed to connect to MongoDB" });
  }

  req.dbConnection = dbConnection;

  next();
};
