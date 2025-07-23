import { model, Schema } from "mongoose";
import { IAuthProvider, IsActive, IUser, Role } from "./user.types";

const authProvider = new Schema<IAuthProvider>(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
  },
  {
    _id: false,
    versionKey: false,
  }
);

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: Object.values(Role), default: Role.User },
    phone: { type: String },
    picture: { type: String },
    address: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.Active,
    },
    isVerified: { type: Boolean, default: false },
    auths: [authProvider],
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    guides: [
      {
        type: Schema.Types.ObjectId,
        ref: "Guide",
      },
    ],
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>("user", userSchema);
