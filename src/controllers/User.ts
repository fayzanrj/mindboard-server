import { Request, Response } from "express";
import handleInternalError from "../libs/handleInternalError";
import User from "../models/UserModel";

// Storing user created from Clerk in the database
export const SignUpWithClerk = async (req: Request, res: Response) => {
  try {
    // destructuring
    const { email, username, clerkId, firstName, lastName, profilePic } =
      req.body.user || {};

    // Checking if a user with the provided email or username already exists
    const existingUser = await User.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() },
      ],
    });
    if (existingUser) {
      return res.status(400).json({
        message: "User with provided email or username already exists",
      });
    }

    const user = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      clerkId,
      firstName,
      lastName,
      profilePic,
    });

    if (!user) {
      return handleInternalError(res);
    }

    // Response
    return res.status(200).json({ message: "User created", userId: user.id });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Getting a user
export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "No User found" });
    }

    // Response
    return res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Updating user in the database
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { email, username, clerkId, firstName, lastName, profilePic } =
      req.body.user || {};

    // Checking if a user with the provided email or username already exists
    const usernameExists = await User.findOne({
      username: username.toLowerCase(),
    });
    const emailExists = await User.findOne({ email: email.toLowerCase() });
    if (
      (usernameExists && usernameExists.id !== req.params.id) ||
      (emailExists && emailExists.id !== req.params.id)
    ) {
      return res.status(400).json({
        message: "User with provided email or username already exists",
      });
    }

    // updating
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      clerkId,
      firstName,
      lastName,
      profilePic,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "No user found" });
    }

    // Response
    return res
      .status(200)
      .json({ message: "User updated", userId: updatedUser.id });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Deleting user from the database
export const deleteUser = async (req: Request, res: Response) => {
  try {
    // deleting
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    // Response
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};
