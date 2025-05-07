import { Icon } from "@iconify/react/dist/iconify.js";
import { IconButton, Toolbar, Tooltip, TooltipProps } from "@mui/material";
import { memo } from "react";

type Props = {
  onClick?: (e:any) => void;
  icon?: string;
  color?: string;
  fontSize?: number;
  tooltipTitle?: string;
  placement?: TooltipProps["placement"];
};

function MyIcon({
  onClick,
  icon = "wpf:approval",
  color,
  fontSize = 20,
  tooltipTitle = "",
  placement = "top",
}: Props) {
  return (
    <Toolbar disableGutters
    sx={{
      minHeight: "auto !important", // Force override
      padding: 0,
      margin: 0,
    }}
    >
      <Tooltip title={tooltipTitle} placement={`${placement}`}
       sx={{
        p: "0px 0px 0px 0px",
      }}
      
      >
        <div className="">
          <IconButton onClick={onClick}
           sx={{
            padding: 0,
            margin: 0,
            minWidth: "auto",
          }}
          >
            <Icon icon={icon} fontSize={fontSize} color={color} />
          </IconButton>
        </div>
      </Tooltip>
    </Toolbar>
  );
}

export default memo(MyIcon);
