import { Response } from "express";

// Centralized function to handle incomplete data errors
const handleIncompleteError = (res: Response) => {
  return res.status(400).json({ message: "Incomplete data" });
};

export default handleIncompleteError;
