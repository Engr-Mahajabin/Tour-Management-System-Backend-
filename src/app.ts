import express, { Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/user/user.route";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/user", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Tour Management System Backend",
  });
});

//Global Error Handling here:
app.use(globalErrorHandler);

// Not found handling here:
app.use(notFound);

export default app;
