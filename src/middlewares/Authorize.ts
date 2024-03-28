import { NextFunction, Request, Response } from "express";
import handleInternalError from "../libs/handleInternalError";

const authorize = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers["accesstoken"] !== process.env.ACCESS_TOKEN) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

export default authorize;
