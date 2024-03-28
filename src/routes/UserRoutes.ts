import express from "express";
import * as userControllers from "../controllers/User";
import userDataCheck from "../middlewares/UserDataCheck";
import isIdValid from "../middlewares/IsValidId";
import authorize from "../middlewares/Authorize";
import userExists from "../middlewares/UserExists";

const router = express.Router();

// isValidId middleware check if the length of provided id is 24
// authorize middleware checks if the api call contains access token
// userExists middleware check if the user with provided userid exists

// Sign up route
router.post(
  "/signupwithclerk",
  authorize,
  userDataCheck,
  userControllers.SignUpWithClerk
);

// Get user
router.get("/getUser/:id", authorize, isIdValid, userControllers.getUser);

// Update user route
router.put(
  "/updateUser/:id",
  authorize,
  isIdValid,
  userExists,
  userDataCheck,
  userControllers.updateUser
);

// Delete user route
router.delete(
  "/deleteUser/:id",
  authorize,
  isIdValid,
  userExists,
  userControllers.deleteUser
);

export default router;
