import mongoose, { Schema, Document } from "mongoose";
import {
  Permissions,
  PermissionType,
  Roles,
  RoleType,
} from "../enums/role.enum";
import { RolePermissions } from "../utils/role-permission";

export interface RoleDocument extends Document {
  name: RoleType;
  permissions: Array<PermissionType>;
}

const roleSchema = new Schema<RoleDocument>(
  {
    name: {
      type: String,
      enum: Object.values(Roles),
      required: true,
      unique: true,
    },
    permissions: {
      type: [String],
      enum: Object.values(Permissions),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


roleSchema.pre("save", function (next) {
  if (!this.permissions || this.permissions.length === 0) {
    this.permissions = RolePermissions[this.name] || [];
  }
  next();
});

const RoleModel = mongoose.model<RoleDocument>("Role", roleSchema);
export default RoleModel;
