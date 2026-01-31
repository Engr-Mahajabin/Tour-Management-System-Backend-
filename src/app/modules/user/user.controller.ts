import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import AppError from "../../errorHelpers/AppError";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new AppError(httpStatus.BAD_REQUEST, "Fake error");
    const user = await UserServices.createUser(req.body);
    res.status(httpStatus.CREATED).json({
      message: "User created successfully",
      user,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // console.log(err);
    next(err);
    res.status(httpStatus.BAD_REQUEST).json({
      message: `Failed to create user ${err.message}`,
      err,
    });
  }
};

export const UserController = {
  createUser,
};

// How User is working:
// route.route.ts -> user.controller.ts -> user.service.ts -> user.model.ts -> Database
