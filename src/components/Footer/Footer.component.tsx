import {
  Container,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
const useStyles = makeStyles((theme) => ({
  footer: {
    //backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(6),
    backgroundColor: "lightgray",
    bottom: 0,
    // position: "absolute",
    // position: "fixed",
    width: "100%",
    textAlign: "center",
    height: "120px",
  },
}));
export const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="xl">
        <div
          className="footer-container"
          style={{ margin: "auto", padding: "5px" }}
        >
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            component="p"
          >
            FunQuiz
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Made By Kinshuk Shah
          </Typography>
          <IconButton color="inherit">
            <GitHubIcon />
          </IconButton>
          <IconButton color="inherit">
            <LinkedInIcon />
          </IconButton>
        </div>
      </Container>
    </footer>
  );
};
