import { Types } from "mongoose";

interface UserProps {
  _id: Types.ObjectId;
  clerkId: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

export default UserProps;
