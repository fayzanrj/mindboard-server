import express from "express";
import * as groupController from "../controllers/Group";
import authorize from "../middlewares/Authorize";
import isIdValid from "../middlewares/IsValidId";
import userExists from "../middlewares/UserExists";
import isAdmin from "../middlewares/isAdmin";
import groupDataCheck from "../middlewares/GroupDataCheck";
import isGroupMember from "../middlewares/isGroupMember";
const router = express.Router();

// isAdmin middleware checks if the user requested api is the admin of the group who's id is provided
// isValidId middleware check if the length of provided id is 24
// authorize middleware checks if the api call contains access token

// Create Group
router.post(
  "/createGroup",
  authorize,
  groupDataCheck,
  groupController.createGroup
);

// Getting all groups based on the user's database id
router.get(
  "/getAllGroups/:id",
  authorize,
  isIdValid,
  userExists,
  groupController.getAllGroups
);

// Getting all groups based on the group database id
router.get(
  "/getGroup/:id",
  authorize,
  isIdValid,
  isGroupMember,
  groupController.getGroup
);

// Deleting a group
router.delete(
  "/deleteGroup/:id",
  authorize,
  isIdValid,
  isAdmin,
  groupController.deleteGroup
);

// adding a member to group
router.put(
  "/addMembers/:id",
  authorize,
  isIdValid,
  isAdmin,
  groupController.addMembers
);

// inviting members to group by email
router.put(
  "/inviteUsersByEmail/:id",
  authorize,
  isIdValid,
  isAdmin,
  groupController.inviteUsersByEmails
);

// joining group
router.put("/joinGroup/:id", authorize, isIdValid, groupController.joinGroup);

// removing a member from the group
router.put(
  "/removeMember/:id",
  authorize,
  isIdValid,
  isAdmin,
  groupController.removeMember
);

router.put(
  "/leaveGroup/:id",
  authorize,
  isIdValid,
  isGroupMember,
  groupController.leaveGroup
);

export default router;
