import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useUser } from "../../context/UserContext/userContext";
import { UserSignIn, UserSignUp } from "../../utils/ApiCall.utils";
import { useNavigate, Link as BaseLink } from "react-router-dom";

export const SignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useUser();
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formdata = new FormData(event.currentTarget);
    const data = {
      name: formdata.get("name") as string,
      email: formdata.get("email") as string,
      password: formdata.get("password") as string,
    };
    const res = await UserSignUp(data);
    if (res.success) {
      const isUserSignIn = await UserSignIn({
        email: formdata.get("email") as string,
        password: formdata.get("password") as string,
      });

      if ("error" in isUserSignIn) {
        alert("Error" + isUserSignIn.error);
        setLoading(false);
      } else {
        console.log({ isUserSignIn });
        setUser(isUserSignIn);
        navigate("/");
      }
    }
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar></Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              label="Name"
              name="name"
              fullWidth
              required
              id="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              label="Email Address"
              name="email"
              fullWidth
              required
              id="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              label="Password"
              name="password"
              fullWidth
              required
              id="password"
              autoComplete="current-password"
              autoFocus
              type="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress disableShrink color="secondary" />
              ) : (
                "SignUp"
              )}
            </Button>
            <Grid container>
              <Grid item>
                <Link>
                  <BaseLink to="/signin">
                    {"Already have a account ? Login"}
                  </BaseLink>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};
