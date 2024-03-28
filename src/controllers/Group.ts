import { Request, Response } from "express";
import { Types } from "mongoose";
import handleIncompleteError from "../libs/handleIncompleteError";
import handleInternalError from "../libs/handleInternalError";
import Group from "../models/GroupModel";
import User from "../models/UserModel";
import { SendInvitationEmail } from "../libs/SendInvitationEmail";

// Get all groups of an user by it's databse userid
export const getAllGroups = async (req: Request, res: Response) => {
  try {
    const groups = await Group.find({
      $or: [{ members: req.params.id }, { admin: req.params.id }],
    })
      .populate("members", "username email")
      .populate("admin", "username email");

    // Response
    return res.status(200).json({ groups });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Get a group by groupID
export const getGroup = async (req: Request, res: Response) => {
  try {
    // Checking if group exists
    const group = await Group.findById(req.params.id)
      .populate("members", "username email profilePic")
      .populate("admin", "username email profilePic");
    if (!group) {
      return res.status(404).json({ message: "No group found" });
    }

    // Response
    return res.status(200).json({ group });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Deleting group
export const deleteGroup = async (req: Request, res: Response) => {
  try {
    // deleting
    const group = await Group.findByIdAndDelete(req.params.id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Response
    return res.status(200).json({ message: "Group deleted" });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Creating group
export const createGroup = async (req: Request, res: Response) => {
  try {
    // Destructuring
    const { admin, image, name } = req.body.group || {};

    // Creating
    const group = await Group.create({
      name,
      admin,
      image,
      members: [],
    });

    // Response
    return res
      .status(200)
      .json({ message: "Group created", groupId: group.id });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Add members to group with an array of ids of users
export const addMembers = async (req: Request, res: Response) => {
  try {
    // Destructuring
    const { members } = req.body.group || {};

    if (!members || members.length < 1) {
      return handleIncompleteError(res);
    }

    // Find the group by ID
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Push the new members into the group's members array
    members.forEach((member: Types.ObjectId) => {
      if (
        member &&
        member.toString().length === 24 &&
        member.toString() !== group.admin.toString() &&
        !group.members.includes(member)
      ) {
        group.members.push(member);
      }
    });

    // Saving the updated group
    const updatedGroup = await group.save();

    //Response
    return res
      .status(200)
      .json({ message: "New members added", groupId: updatedGroup.id });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Removing members
export const removeMember = async (req: Request, res: Response) => {
  try {
    // Destructuring
    const { user } = req.body || {};

    if (!user || user.length !== 24) {
      return handleIncompleteError(res);
    }

    // Find the group by ID
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Removing users
    group.members = group.members.filter(
      (member) => member.toString() !== user.toString()
    );

    // Saving the updated group
    const updatedGroup = await group.save();

    // TODO : EMAIL / NOTIFICATION LOGIC TO IMPLEMENT YET

    // Response
    return res
      .status(200)
      .json({ message: "Member has been removed", groupId: updatedGroup.id });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Removing members
export const leaveGroup = async (req: Request, res: Response) => {
  try {
    // Destructuring
    const { requestingUserId } = req.query || {};

    if (!requestingUserId || requestingUserId.length !== 24) {
      return handleIncompleteError(res);
    }

    // Find the group by ID
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Removing users
    group.members = group.members.filter(
      (member) => member.toString() !== requestingUserId.toString()
    );

    // Saving the updated group
    const updatedGroup = await group.save();

    // TODO : EMAIL / NOTIFICATION LOGIC TO IMPLEMENT YET

    // Response
    return res
      .status(200)
      .json({ message: "Group left", groupId: updatedGroup.id });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// route to send invite emails to users
export const inviteUsersByEmails = async (req: Request, res: Response) => {
  try {
    const { emails }: { emails: string[] } = req.body || {};

    if (!emails || emails.length < 1) {
      return handleIncompleteError(res);
    }

    const group = await Group.findById(req.params.id).populate(
      "admin",
      "firstName lastName"
    );

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Fetch users from the database
    const users = await User.find({ email: { $in: emails } });

    if (!users) {
      return res
        .status(404)
        .json({ message: "No users found with the provided IDs" });
    }

    users.forEach(async (user) => {
      await SendInvitationEmail(
        user.email,
        `${user.firstName} ${user.lastName}`,
        // @ts-ignore
        `${group.admin.firstName} ${group.admin.lastName}`,
        group.name,
        `https://mindboard.vercel.app/groups/join/${group._id}`
      );
    });

    // Response
    return res.status(200).json({
      message: "Invites have been sent on provided emails",
      groupId: group.id,
    });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// joining group
export const joinGroup = async (req: Request, res: Response) => {
  try {
    // Destructring
    const { user } = req.body || {};

    if (!user || user.length !== 24) {
      return handleIncompleteError(res);
    }

    // Find the group by ID
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    // Accepting invite and adding user from invites to members list
    if (!group.members.includes(user)) {
      group.members.push(user);
    }

    // Saving the updated group
    const updatedGroup = await group.save();

    // TODO : EMAIL / NOTIFICATION LOGIC TO IMPLEMENT YET

    // Response
    return res
      .status(200)
      .json({ message: "Invitation accepted", groupId: updatedGroup.id });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};
