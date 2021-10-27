import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { UserQuizTable } from "../../components/UserQuizTable/UserQuizTable.component";
import { useUserData } from "../../hooks/useUserData";

export const UserDetails = () => {
  const { handleLogout, user } = useUserData();
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
            <Grid item xs={12}>
              <UserQuizTable tableData={user?.user.takenQuizList} />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            style={{ margin: "0 auto" }}
            variant="contained"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};
