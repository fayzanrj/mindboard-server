import { NextFunction, Request, Response } from "express";
import handleInternalError from "../libs/handleInternalError";

// Function to check if the provided ID is valid
const isIdValid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.params.id.length !== 24) {
      return res.status(400).json({ message: "Invalid id" });
    }

    next();
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

export default isIdValid;
