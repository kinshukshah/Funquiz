import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import React from "react";
import { useLocation } from "react-router";
import { Link as BaseLink } from "react-router-dom";
import { LocationState } from "../../context/UserContext/user.types";
import { useUserData } from "../../hooks/useUserData";
export const SignIn = () => {
  const location = useLocation();
  const locationState = (location.state as LocationState) || {
    from: { pathName: "/" },
  };
  const { handleSignInSubmit, error, loading } = useUserData();
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
          <Box
            component="form"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              handleSignInSubmit(
                e as React.FormEvent<HTMLFormElement>,
                locationState
              )
            }
          >
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
                <CircularProgress color="secondary" size={20} disableShrink />
              ) : (
                "Sign In"
              )}
            </Button>
            <Grid container>
              <Grid item>
                <BaseLink to="/signup">
                  {"Don't have a account ? Sign Up"}
                </BaseLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};
