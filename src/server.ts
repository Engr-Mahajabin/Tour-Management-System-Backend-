/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);

    console.log("Connected to MongoDB");
    app.listen(envVars.PORT, () => {
      console.log(`Server is running on port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await startServer();
  await seedSuperAdmin();
})();

//signal termination sigterm error:
process.on("SIGTERM", (err) => {
  console.log("SIGTERM received, shutting down...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// unhandled rejection error:
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection detected, shutting down...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Promise.reject(new Error("Promise Error from server.ts"));

// uncaught rejection error:
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected, shutting down...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// throw new Error("Uncaught Exception Error from server.ts");

/* 
error:
    1. unhandled rejection error
    2. uncaught rejection error 
    3. signal termination sigterm
    
*/
