import { RootState } from "@/store";
import { Role } from "@/types/role";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useRole = (roleId: string | undefined): Role | null => {
  const [role, setRole] = useState<Role | null>(null);
  const { roleList } = useSelector((state: RootState) => state.role);

  useEffect(() => {
    if (!roleList || !roleId) return;
    const idx = roleList.findIndex((role) => role.id === roleId);
    idx >= 0 && setRole(roleList[idx]);
  }, [roleId, roleList]);

  return role;
};
