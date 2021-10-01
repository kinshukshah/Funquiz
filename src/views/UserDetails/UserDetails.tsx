import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import React from "react";
import { useUser } from "../../context/UserContext/userContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "100%",
    },
    paper: {
      // height: 240,
      width: 250,
    },
  })
);

export const UserDetails = () => {
  const { user } = useUser();
  return (
    <Container maxWidth="xs">
      <Card variant="elevation">
        <CardContent>
          <Avatar style={{ margin: "12px auto" }}>{user?.user.name[0]}</Avatar>
          <Grid container>
            <Grid item xs={12} sm={2}>
              <Typography gutterBottom>Name:</Typography>
            </Grid>
            <Grid item xs={12} sm={10}>
              <Typography gutterBottom>{user?.user.name}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={2}>
              <Typography gutterBottom>Email:</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography gutterBottom>{user?.user.email}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};
