import { Icon } from "@iconify/react/dist/iconify.js";
import { IconButton, Toolbar, Tooltip } from "@mui/material";

type Props = {
  onClick: () => void;
  icon?: string;
  title?: string;
};

function MyEditIcon({ onClick, icon = "bxs:edit", title="Edit" }: Props) {
  return (
    <Toolbar disableGutters>
      <Tooltip title={title} placement="top">
        <IconButton onClick={onClick}>
          <Icon icon={icon} fontSize={20} />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

export default MyEditIcon;
