import { AccountsServer } from "@accounts/server";
import { Mongo } from "@accounts/mongo";
import accountsExpress from "@accounts/rest-express";
import AccountsPassword from "@accounts/password";

import { User } from "feat/user/schema";

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

  accountsServer.on("CreateUserSuccess", async ({ _id }) => {
    await User.findByIdAndUpdate(_id, {
      $set: {
        "emails.0.verified": true,
      },
    }).exec();
  });

  app.use(accountsExpress(accountsServer, { path: "/api" }));

  return accountsServer;
};

export const getAccountsServer = () => accountsServer;
