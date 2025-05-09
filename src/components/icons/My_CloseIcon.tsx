import { Close } from "@mui/icons-material";
import { IconButton, Toolbar, Tooltip } from "@mui/material";

type Props = {
  onClick: () => void;
  isTooltip?: boolean;
  color?:string
};

export default function MyCloseIcon({ onClick, isTooltip, color }: Props) {
  const icon = <Close sx={{ color }} />;

  return (
    <>
      {isTooltip ? (
        <Toolbar disableGutters>
          <Tooltip title="Close" placement="top">
            <div className="">
            <IconButton onClick={onClick}>
              {icon}
            </IconButton>   
            </div>
           
          </Tooltip>
        </Toolbar>
      ) : (
        <IconButton onClick={onClick}>
          {icon}
        </IconButton>
      )}
    </>
  );
}
