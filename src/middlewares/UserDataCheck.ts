import { Request, Response, NextFunction } from "express";
import handleIncompleteError from "../libs/handleIncompleteError";
import handleInternalError from "../libs/handleInternalError";

const userDataCheck = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, username, firstName, profilePic } = req.body.user || {};
    if (!email || !username || !firstName || !profilePic) {
      return handleIncompleteError(res);
    }
    next();
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

export default userDataCheck;
