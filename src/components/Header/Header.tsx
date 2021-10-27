import React from "react";
import {
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import { useNavigate } from "react-router-dom";

const Header = ({
  toggleColorMode,
}: {
  toggleColorMode: (param: any) => void;
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <AppBar position="sticky" sx={{ marginBottom: "2rem" }} color="inherit">
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          <IconButton
            onClick={() => navigate("/")}
            color="inherit"
            disableRipple
          >
            <MenuIcon />
            <Typography
              variant="h6"
              color="rgb(8, 4, 251)"
              sx={{ marginLeft: "5px" }}
            >
              FunQuiz
            </Typography>
          </IconButton>
        </div>

        <IconButton color="inherit" onClick={() => navigate("/user/detail")}>
          <AccountCircleIcon />
        </IconButton>
        <IconButton color="inherit" onClick={toggleColorMode}>
          {theme.palette.mode === "dark" ? <WbSunnyIcon /> : <NightsStayIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
