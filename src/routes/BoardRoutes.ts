import express from "express";
import * as boardController from "../controllers/Board";
import authorize from "../middlewares/Authorize";
import isIdValid from "../middlewares/IsValidId";
import hasAccessToBoard from "../middlewares/hasAccessToBoard";
import isGroupMember from "../middlewares/isGroupMember";

const router = express.Router();

// authorize middleware checks if the api call contains access token
// isGroupMember middleware check if the user requesting is a member or admin of the group or not
// hasAccessToBoard middleware check if the user requesting

// route to create board
router.post(
  "/createBoard/:groupId",
  authorize,
  isGroupMember,
  boardController.createBoard
);

// route to get all the boards of the requesting user
router.get(
  "/getAllBoards/:groupId",
  authorize,
  isGroupMember,
  boardController.getAllBoards
);

// route to authenticate if the user has access to the board and return it with the user data
router.get(
  "/getBoardWithUser/:id",
  authorize,
  hasAccessToBoard,
  boardController.getBoardWithUser
);

// route to get board data
router.get(
  "/getBoard/:id",
  authorize,
  hasAccessToBoard,
  boardController.getboard
);

// route to update the board name
router.put(
  "/updateName/:id",
  authorize,
  isIdValid,
  hasAccessToBoard,
  boardController.updateName
);

// route to delete a board
router.delete(
  "/deleteBoard/:id",
  authorize,
  isIdValid,
  hasAccessToBoard,
  boardController.deleteBoard
);

export default router;
