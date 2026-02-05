import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createUser = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User created successfully",
      data: user,
    });
  },
);

const getAllUsers = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Users retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  },
);

export const UserController = {
  createUser,
  getAllUsers,
};

// How User is working:
// route.route.ts -> user.controller.ts -> user.service.ts -> user.model.ts -> Database
