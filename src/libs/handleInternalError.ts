import { Response } from "express";

// Centralized function to handle internal server errors
const handleInternalError = (res: Response) => {
  return res.status(500).json({ message: "Internal Server Error" });
};

export default handleInternalError;
