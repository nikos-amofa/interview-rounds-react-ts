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

export const dateTimeFormatter = (dateStr: string) => {
  const date = new Date(dateStr);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  } as const;

  const formatter = new Intl.DateTimeFormat("en-US", options);

  return formatter.format(date);
};
