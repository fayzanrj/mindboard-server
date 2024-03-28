import { Document, Types } from "mongoose";

// Interface for the Board Document
interface BoardProps extends Document {
  name: string;
  groupId: Types.ObjectId;
  isFavOf?: Types.ObjectId[];
  lastUpdatedBy?: Types.ObjectId;
  createdBy: Types.ObjectId;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export default BoardProps;
