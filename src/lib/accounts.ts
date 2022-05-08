import { AccountsServer } from "@accounts/server";
import { Mongo } from "@accounts/mongo";
import accountsExpress from "@accounts/rest-express";
import AccountsPassword from "@accounts/password";

// utils
import { db } from "./db";
import { defaultPriorities } from "feat/priorities/utils";

let accountsServer: AccountsServer;

export const setupAccounts = ({ app, mongoose }: any) => {
  const accountsMongo = new Mongo(mongoose.connection, {
    dateProvider: date => date || new Date(),
  });
  const password = new AccountsPassword({
    validateNewUser: user => user,
    validateEmail: () => true,
  });

  accountsServer = new AccountsServer(
    {
      db: accountsMongo,
      tokenSecret: process.env.ACCOUNTS_SECRET! ?? "insecure",
    },
    { password },
  );

  // full list of hooks:
  // https://github.com/accounts-js/accounts/blob/master/packages/server/src/utils/server-hooks.ts
  accountsServer.on("CreateUserSuccess", async ({ _id }) => {
    await db.User.findByIdAndUpdate(_id, {
      $set: {
        "emails.0.verified": true,
      },
    }).exec();

    await db.Priorities.insertMany(
      defaultPriorities.map(priority => ({ ...priority, owner: _id })),
    );
  });

  app.use(accountsExpress(accountsServer, { path: "/api" }));

  return accountsServer;
};

export const getAccountsServer = () => accountsServer;
