import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { userLoader } from "@accounts/rest-express";

// api
import { userRoutes } from "feat/user";

// utils
import { setupAccounts, getAccountsServer } from "lib/accounts";
import { connectToMongo } from "lib/db";
import { logger } from "lib/logger";

const config = {
  name: "mental-list-api",
  port: parseInt(process.env.PORT!),
  host: "0.0.0.0",
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.disable("x-powered-by");

const start = async () => {
  try {
    const mongoose = await connectToMongo();

    setupAccounts({ app, mongoose });

    app.use(userLoader(getAccountsServer()));

    app.use("/api/user", userRoutes);

    app.get("/api/healthcheck", (_, res) => {
      return res.status(200).send("healthy");
    });

    app.listen(config.port, config.host, (e?: Error | null) => {
      if (e) {
        throw new Error("Internal Server Error");
      }
      logger.info(`🚀 ${config.name} running on ${config.host}:${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
