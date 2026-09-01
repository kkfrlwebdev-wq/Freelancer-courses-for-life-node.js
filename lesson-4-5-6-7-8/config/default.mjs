
import "dotenv/config";

const databaseName = process.env.DATABASE_NAME;
const databaseUrl = process.env.MONGODB_URI?.replace(/\/$/, "");

export default Object.freeze({
  databaseName,
  databaseUrl,
  mongoURI: `${databaseUrl}/${databaseName}`,
  port: process.env.PORT,
});
