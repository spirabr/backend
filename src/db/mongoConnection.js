import MongoClient from "mongodb";

const setupDb = async () => {
  const connection = await MongoClient.connect(process.env.MONGODB_URL);
  return connection.db(process.env.MONGODB_DATABASE_NAME);
};

export default async (req, res, next) => {
  const dbConnection = await setupDb();

  if (!dbConnection) {
    res.status(500).send({ error: "Failed to connect to mongodb!" });
  }

  req.dbConnection = dbConnection;

  next();
};
