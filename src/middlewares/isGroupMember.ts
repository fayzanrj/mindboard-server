import { NextFunction, Request, Response } from "express";
import handleInternalError from "../libs/handleInternalError";
import Group from "../models/GroupModel";

const isGroupMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupId = req.params.groupId || (req.params.id as string);
    const requestingUserId = req.query.requestingUserId as string;

    if (!groupId) {
      return res.status(404).json({ message: "No group found" });
    }

    // Checking if group exists
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "No group found" });
    }

    // Checking if requesting user belongs to the group
    if (group.admin.toString() !== requestingUserId) {
      const index = group.members.findIndex(
        (member) => member.toString() === requestingUserId
      );

      if (index === -1) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    }

    req.body.group = group;

    next();
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

export default isGroupMember;
