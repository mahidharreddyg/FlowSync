import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { z } from "zod";
import { HTTPSTATUS } from "../config/http.config";
import { joinWorkspaceByInviteService, removeMemberFromWorkspaceService, getMemberRoleInWorkspace } from "../services/member.service";
import { roleGuard } from "../utils/roleGuard";
import { Permissions } from "../enums/role.enum";
import { UnauthorizedException } from "../utils/appError";

export const joinWorkspaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const inviteCode = z.string().parse(req.params.inviteCode);
    const userId = req.user?._id;

    if (!userId) {
      throw new UnauthorizedException("User not authenticated");
    }

    const { workspaceId, role } = await joinWorkspaceByInviteService(
      userId,
      inviteCode
    );

    return res.status(HTTPSTATUS.OK).json({
      message: "Successfully joined the workspace",
      workspaceId,
      role,
    });
  }
);

export const removeMemberController = asyncHandler(
  async (req: Request, res: Response) => {
    const { workspaceId, memberId } = req.params;
    const currentUserId = req.user?._id;

    if (!currentUserId) {
      throw new UnauthorizedException("User not authenticated");
    }

    const { role } = await getMemberRoleInWorkspace(currentUserId, workspaceId);
    
    roleGuard(role, [Permissions.REMOVE_MEMBER]);

    const result = await removeMemberFromWorkspaceService(
      workspaceId,
      memberId,
      currentUserId
    );

    return res.status(HTTPSTATUS.OK).json(result);
  }
);
