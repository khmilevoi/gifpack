import dotenv from "dotenv";

dotenv.config();

export const config = {
  token: process.env.TOKEN,
  localDbPath: "./local-db",
};
