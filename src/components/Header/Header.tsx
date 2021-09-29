import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import { useUser } from "../../context/UserContext/userContext";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      flexGrow: 1,
    },
  })
);

const Header = () => {
  const classes = useStyles();
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <Container maxWidth="xl" style={{ marginBottom: "100px" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.typography}>
            FunQuiz
          </Typography>
          <IconButton color="inherit" onClick={() => navigate("/user/detail")}>
            <AccountCircleIcon />
          </IconButton>
          <IconButton color="inherit">
            <NightsStayIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Header;
