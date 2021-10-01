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
import { useNavigate, useLocation } from "react-router";
import { useUser } from "../../context/UserContext/userContext";
import { UserSignIn } from "../../utils/ApiCall.utils";
import { Link as BaseLink } from "react-router-dom";
import { LocationState } from "../../context/UserContext/user.types";
export const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = (location.state as LocationState) || {
    from: { pathName: "/" },
  };
  console.log({ from });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formdata = new FormData(event.currentTarget);
    const data = {
      email: formdata.get("email") as string,
      password: formdata.get("password") as string,
    };
    const isUserSignIn = await UserSignIn(data);

    if ("error" in isUserSignIn) {
      alert("Error" + isUserSignIn.error);
      setLoading(false);
    } else {
      setUser(isUserSignIn);
      console.log({ isUserSignIn });
      console.log({ from });
      navigate(from.pathName);
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
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
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
                <CircularProgress color="secondary" disableShrink />
              ) : (
                "Sign In"
              )}
            </Button>
            <Grid container>
              <Grid item>
                <Link>
                  <BaseLink to="/signup">
                    {"Don't have a account ? Sign Up"}
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
