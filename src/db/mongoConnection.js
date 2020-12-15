import MongoClient from "mongodb";

export const setupDb = async () => {
  try {
    const connection = await MongoClient.connect(process.env.MONGODB_URL);
    const dbName = getDbName();

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

const getDbName = () => {
  const isTestEnv = process.env.NODE_ENV === "test";

  return `${process.env.MONGODB_DATABASE_NAME}${isTestEnv ? "_test" : ""}`;
}
