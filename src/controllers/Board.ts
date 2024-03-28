import { Request, Response } from "express";
import handleInternalError from "../libs/handleInternalError";
import Board from "../models/BoardModel";
import GroupProps from "../props/GroupProps";
import User from "../models/UserModel";
import BoardProps from "../props/BoardProps";
import handleIncompleteError from "../libs/handleIncompleteError";

// Creating a new board
export const createBoard = async (req: Request, res: Response) => {
  try {
    const { name, image = "1.svg" } = req.body.board as BoardProps;
    const { _id } = req.body.group as GroupProps;
    const { requestingUserId } = req.query;

    if (!name) return handleIncompleteError(res);

    // Creating
    const board = await Board.create({
      name,
      image,
      group: _id,
      createdBy: requestingUserId,
      lastUpdatedBy: requestingUserId,
    });

    // Response
    res.status(200).json({ message: "Board Created" });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Getting all boards of a specific group
export const getAllBoards = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body.group as GroupProps;

    const boards = await Board.find({
      group: _id,
    })
      .populate("group")
      .populate("createdBy", "username email firstName lastName profilePic")
      .populate(
        "lastUpdatedBy",
        "username email firstName lastName profilePic"
      );

    // Response
    res.status(200).json({ boards });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Authenticating user and responsing with user data and board data
export const getBoardWithUser = async (req: Request, res: Response) => {
  try {
    const { board } = req.body.board;
    const user = await User.findById(req.query.requestingUserId);

    // Response
    res.status(200).json({ board, user });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Getting a specific board
export const getboard = async (req: Request, res: Response) => {
  try {
    const board = await Board.findById(req.params.id)
      .populate("group")
      .populate("createdBy", "username email firstName lastName profilePic")
      .populate(
        "lastUpdatedBy",
        "username email firstName lastName profilePic"
      );
    // Response
    res.status(200).json({ board });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Updating name of board
export const updateName = async (req: Request, res: Response) => {
  try {
    const { newName } = req.body;
    const { id } = req.params;

    const board = await Board.findByIdAndUpdate(id, {
      name: newName,
      lastUpdatedBy: req.query.requestingUserId,
    });

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    // Response
    res.status(200).json({ message: "Name updated" });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Deleting a board
export const deleteBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const board = await Board.findByIdAndDelete(id);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    // Response
    res.status(200).json({ message: "Board Deleted Successfully" });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};
