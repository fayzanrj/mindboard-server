import { Document, Types } from "mongoose";

interface GroupProps extends Document {
  _id: Types.ObjectId;
  name: string;
  admin: Types.ObjectId;
  members?: Types.ObjectId[];
  slug: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default GroupProps;
