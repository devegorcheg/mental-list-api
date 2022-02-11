import { Migration } from "./schema";

export const stateStore = {
  load: async (fn: any) => {
    const migration = await Migration.findOne({}).lean().exec();

    if (!migration) {
      console.log(
        "Cannot read migrations from database. If this is the first time you run migrations, then this is normal.",
      );
      return fn(null, {});
    }

    fn(null, migration.data);
  },
  save: async (set: any, fn: any) => {
    try {
      await Migration.findOneAndUpdate(
        {},
        {
          $set: {
            data: set,
          },
        },
        {
          upsert: true,
        },
      ).exec();
    } catch (error) {
      console.log(error);
    }

    fn();
  },
};
