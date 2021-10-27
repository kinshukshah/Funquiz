import { Button, Grid } from "@mui/material";
import React from "react";
import { useQuizPlay } from "../../hooks/useQuizPlay";
export const ResultAction = () => {
  const { error, loading, handlePlayMoreQuiz, handleSaveResults, resultSaved } =
    useQuizPlay();
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSaveResults}
          disabled={loading || resultSaved}
        >
          {loading ? "Loading..." : resultSaved ? "Saved" : "Save Results"}
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          variant="outlined"
          fullWidth
          onClick={handlePlayMoreQuiz}
          disabled={loading}
        >
          Play More Quiz?
        </Button>
      </Grid>
    </Grid>
  );
};
