import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { renderRoleTitles } from "./helpers";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface RoleSelectorProps {
  isFinalRound: boolean;
  value: string[];
  onChange: (v: string[]) => void;
}

export const RoleSelector: FC<RoleSelectorProps> = ({ isFinalRound, value, onChange }) => {
  const { roleList } = useSelector((state: RootState) => state.role);

  const handleChange = (event: SelectChangeEvent<string | string[]>) => {
    const {
      target: { value },
    } = event;
    // On autofill we get a stringified value.
    onChange(typeof value === "string" ? value.split(",") : value);
  };

  if (!roleList) {
    // TODO: notification message to refresh
    return null;
  }

  return (
    <div>
      <FormControl sx={{ m: 1 }} fullWidth>
        <InputLabel id="demo-multiple-checkbox-label">
          {isFinalRound ? "Final Role" : "Fitting Roles"}
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple={!isFinalRound}
          value={value}
          onChange={handleChange}
          input={<OutlinedInput label={isFinalRound ? "Final Role" : "Fitting Roles"} />}
          renderValue={(selected) => renderRoleTitles(selected, roleList)}
          MenuProps={MenuProps}
        >
          {roleList.map((role) => (
            <MenuItem key={role.id} value={role.id}>
              <Checkbox checked={value.indexOf(role.id) > -1} />
              <ListItemText primary={role.title} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
