import { Request, Response, NextFunction } from "express";
import handleIncompleteError from "../libs/handleIncompleteError";
import handleInternalError from "../libs/handleInternalError";

const groupDataCheck = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { admin, name } = req.body.group || {};
    if (!admin || !name) {
      return handleIncompleteError(res);
    }
    next();
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

export default groupDataCheck;
