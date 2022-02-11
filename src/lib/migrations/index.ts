require("../../../ts_compiler.js");

// @ts-expect-error
import migrate from "migrate";

import { stateStore } from "lib/migrations/migrateStorage";
import { connectToMongo } from "lib/db";

export const runMigrations = async () => {
  try {
    await connectToMongo();

    return migrate.load(
      {
        stateStore,
      },
      function (err: any, set: any) {
        if (err) {
          throw err;
        }

        set.up((err2: any) => {
          if (err2) {
            throw err2;
          }

          console.log("✔️  Migrations successfully ran");
          process.exit(0);
        });
      },
    );
  } catch (error) {
    console.error("❌ Migration failed", error);
    return process.exit(10);
  }
};

runMigrations();
