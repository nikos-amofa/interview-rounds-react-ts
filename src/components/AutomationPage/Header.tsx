import { useSelector } from "react-redux";
import Avatar from "@/components/common/Avatar";
import Box from "@/components/common/Box";
import Typography from "@/components/common/Typography";
import { RootState } from "@/store";
import { styled } from "@mui/material/styles";
import { deepPurple } from "@mui/material/colors";
import { useRole } from "@/hooks/useRole";

const Row = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "20px",
  backgroundColor: deepPurple[300],
  padding: theme.spacing(1, 2),
  color: theme.palette.primary.contrastText,
}));

export const Header = () => {
  const { data: candidate } = useSelector((state: RootState) => state.candidate);
  const role = useRole(candidate?.roleId);

  if (!candidate) {
    return null;
  }

  const fullName = `${candidate.firstName} ${candidate.lastName}`;

  return (
    <Row>
      <Avatar alt={fullName} src={candidate.avatarUrl ?? ""} />
      <Box>
        <Typography variant="h4">{fullName}</Typography>
        <Typography variant="body1">{role?.title || "unknown"}</Typography>
      </Box>
    </Row>
  );
};
