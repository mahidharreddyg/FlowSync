import { ErrorCodeEnum } from "../enums/error-code.enum";
import { Roles } from "../enums/role.enum";
import MemberModel from "../models/member.model";
import RoleModel from "../models/roles-permission.model";
import WorkspaceModel from "../models/workspace.model";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../utils/appError";

export const getMemberRoleInWorkspace = async (
  userId: string,
  workspaceId: string
) => {
  if (!userId) {
    throw new UnauthorizedException(
      "User not authenticated",
      ErrorCodeEnum.ACCESS_UNAUTHORIZED
    );
  }

  const workspace = await WorkspaceModel.findById(workspaceId);
  if (!workspace) {
    throw new NotFoundException("Workspace not found");
  }

  const member = await MemberModel.findOne({
    userId,
    workspaceId,
  }).populate("role");

  if (!member) {
    throw new UnauthorizedException(
      "You are not a member of this workspace",
      ErrorCodeEnum.ACCESS_UNAUTHORIZED
    );
  }

  const roleName = member.role?.name;
  if (!roleName) {
    throw new UnauthorizedException(
      "User role not found",
      ErrorCodeEnum.ACCESS_UNAUTHORIZED
    );
  }

  return { role: roleName };
};

export const joinWorkspaceByInviteService = async (
  userId: string,
  inviteCode: string
) => {
  // Find workspace by invite code
  const workspace = await WorkspaceModel.findOne({ inviteCode }).exec();
  if (!workspace) {
    throw new NotFoundException("Invalid invite code or workspace not found");
  }

  // Check if user is already a member
  const existingMember = await MemberModel.findOne({
    userId,
    workspaceId: workspace._id,
  }).exec();

  if (existingMember) {
    throw new BadRequestException("You are already a member of this workspace");
  }

  const role = await RoleModel.findOne({ name: Roles.MEMBER });

  if (!role) {
    throw new NotFoundException("Role not found");
  }

  // Add user to workspace as a member
  const newMember = new MemberModel({
    userId,
    workspaceId: workspace._id,
    role: role._id,
  });
  await newMember.save();

  return { workspaceId: workspace._id, role: role.name };
};

export const removeMemberFromWorkspaceService = async (
  workspaceId: string,
  memberId: string,
  currentUserId: string
) => {
  const workspace = await WorkspaceModel.findById(workspaceId);
  if (!workspace) {
    throw new NotFoundException("Workspace not found");
  }

  // Check if the member exists in the workspace
  const member = await MemberModel.findOne({
    userId: memberId,
    workspaceId: workspaceId,
  }).populate("role");

  if (!member) {
    throw new NotFoundException("Member not found in the workspace");
  }

  // Prevent self-removal
  if (memberId === currentUserId) {
    throw new BadRequestException("You cannot remove yourself from the workspace");
  }

  // Prevent removing the owner
  if (member.role?.name === Roles.OWNER) {
    throw new BadRequestException("Cannot remove the workspace owner");
  }

  // Remove the member
  await MemberModel.deleteOne({
    userId: memberId,
    workspaceId: workspaceId,
  });

  return { message: "Member removed successfully" };
};
