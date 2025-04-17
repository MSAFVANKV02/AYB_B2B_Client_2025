import { Close } from "@mui/icons-material";
import { IconButton, Toolbar, Tooltip } from "@mui/material";

type Props = {
  onClick: () => void;
  isTooltip?: boolean;
};

export default function MyCloseIcon({ onClick, isTooltip }: Props) {
  return (
    <>
      {isTooltip ? (
        <Toolbar disableGutters>
          <Tooltip title="Close" placement="top">
            <div className="">
            <IconButton onClick={onClick}>
              <Close />
            </IconButton>   
            </div>
           
          </Tooltip>
        </Toolbar>
      ) : (
        <IconButton onClick={onClick}>
          <Close />
        </IconButton>
      )}
    </>
  );
}
