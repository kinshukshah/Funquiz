import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext/quizContext";
import { useUser } from "../../context/UserContext/userContext";
import { saveQuizResults } from "../../utils/ApiCall.utils";
export const ResultAction = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { quizState } = useQuiz();
  const [loading, setLoading] = useState<boolean>(false);
  const [resultSaved, setResultSaved] = useState<boolean>(false);
  const handlePlayMoreQuiz = () => {
    navigate("/");
  };
  const handleSaveResults = async () => {
    console.log("yes");
    if (user) {
      setLoading(true);
      const res = await saveQuizResults(quizState, user);
      console.log({ res });
      if ("error" in res) {
        alert("Something Went wrong" + res.error);
        setLoading(false);
      } else {
        setUser(res);
        localStorage.setItem("user", JSON.stringify(res));
        setLoading(false);
        setResultSaved(true);
      }
    } else {
      navigate("/signin", {
        state: { from: { pathName: `/quiz/${quizState.quizId}` } },
      });
    }
  };
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
