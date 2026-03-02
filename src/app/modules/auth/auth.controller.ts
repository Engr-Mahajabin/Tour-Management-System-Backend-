import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import AppError from "../../errorHelpers/AppError";

const credentialsLogin = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthService.credentialsLogin(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged in successfully",
      data: loginInfo,
    });
  },
);

const getNewAccessToken = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "No refresh token is received from cookies",
      );
    }

    const tokenInfo = await AuthService.getNewAccessToken(
      refreshToken as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "New access token generated successfully",
      data: tokenInfo,
    });
  },
);

export const AuthController = {
  credentialsLogin,
  getNewAccessToken,
};
