import { FinalInterviewRound, InterviewRound, isInterviewRoundFinal } from "@/types/interviewRound";
import { Role } from "@/types/role";

export const makeSelectedRoleIds = (ir: InterviewRound | FinalInterviewRound) => {
  if (isInterviewRoundFinal(ir)) {
    return ir.finalRoleId ? [ir.finalRoleId] : [];
  }
  return ir.fittingRoleIds ? ir.fittingRoleIds : [];
};

export const renderRoleTitles = (roleIds: string[], roles: Role[]) => {
  const rolesHash: { [key: string]: string } = {};
  for (const role of roles) {
    rolesHash[role.id] = role.title;
  }
  return roleIds.map((roleId) => rolesHash[roleId]).join(", ");
};

export const timeAgoFormatter = (timestamp: number): string => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval + (interval === 1 ? " year" : " years") + " ago";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + (interval === 1 ? " month" : " months") + " ago";
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + (interval === 1 ? " day" : " days") + " ago";
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + (interval === 1 ? " hour" : " hours") + " ago";
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + (interval === 1 ? " minute" : " minutes") + " ago";
  }

  return Math.floor(seconds) + (Math.floor(seconds) === 1 ? " second" : " seconds") + " ago";
};
