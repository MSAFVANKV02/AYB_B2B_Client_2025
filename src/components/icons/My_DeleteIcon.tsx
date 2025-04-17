import { Icon } from "@iconify/react/dist/iconify.js";
import { IconButton, Toolbar, Tooltip } from "@mui/material";

type Props = {
  onClick: () => void;
  icon?: string;
  title?: string;
  color?: string; // Color of the icon
};

export default function MyDeleteIcon({
  onClick,
  icon = "material-symbols:delete",
  title = "Delete",
  color = "", // Color of the tooltip and icon, defaults to error color.
}: Props) {
  return (
    <Toolbar disableGutters>
      <Tooltip title={title} placement="top">
        <div className="">
          <IconButton onClick={onClick}>
            <Icon icon={icon} fontSize={20} color={color} />
          </IconButton>
        </div>
      </Tooltip>
    </Toolbar>
  );
}
