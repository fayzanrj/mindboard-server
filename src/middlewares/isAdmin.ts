import { NextFunction, Request, Response } from "express";
import handleInternalError from "../libs/handleInternalError";
import Group from "../models/GroupModel";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { requestingUserId } = req.query || {};

    // Finding group
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Checking if the requesting user is the admin of the group or not
    if (group.admin.toString() !== requestingUserId) {
      return res.status(401).json({
        message: "Only group admin is authorized to perform this action",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

export default isAdmin;
