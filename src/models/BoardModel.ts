import mongoose, { Schema, Document } from "mongoose";

const boardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    isFavOf: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
    ],
    lastUpdatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
      sparse: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Board = mongoose.model("Board", boardSchema);

export default Board;
