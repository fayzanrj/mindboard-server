import { NextFunction, Request, Response } from "express";
import handleInternalError from "../libs/handleInternalError";
import User from "../models/UserModel";

const userExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Checking if the user exists
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

export default userExists;
