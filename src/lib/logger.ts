import fs from "fs";
// @ts-expect-error
import pinoms from "pino-multi-stream";

const prettyStream = pinoms.prettyStream();

const level = process.env.LOG_LEVEL || "info";

if (process.env.NODE_ENV === "development") {
  if (!fs.existsSync("./logs")) {
    fs.mkdirSync("logs");
  }
}

const streams = [
  { level, stream: prettyStream, prettyPrint: true },
  {
    level,
    stream: fs.createWriteStream(
      `logs/${new Date().toISOString().split("T")[0]}.log`,
      { flags: "a" },
    ),
    prettyPrint: true,
  },
];

export const logger = pinoms({ streams, level });
