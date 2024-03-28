import { NextFunction, Request, Response } from "express";
import handleInternalError from "../libs/handleInternalError";
import Board from "../models/BoardModel";

const hasAccessToBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params || {};
    const requestingUserId = req.query.requestingUserId as string;

    // Getting board
    const board = await Board.findById(id).populate("group");
    if (!board) {
      return res.status(404).json({ message: "No board found" });
    }
    // Getting group from board
    const group = board.group;

    // Checking if requesting user belongs to the group
    // @ts-ignore
    if (group.admin.toString() !== requestingUserId) {
      // @ts-ignore
      const index = group.members.findIndex(
        // @ts-ignore
        (member) => member.toString() === requestingUserId
      );

      if (index === -1) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    }

    req.body.group = group;
    req.body.board = board;

    next();
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

export default hasAccessToBoard;
