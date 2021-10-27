import React from "react";
import { Quiz } from "../../context/QuizContext/quiz.types";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext/quizContext";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

export const QuizList = () => {
  const { dispatchQuiz, quizList, setCurrentQuestion } = useQuiz();
  let navigate = useNavigate();

  return (
    <Container
      maxWidth="lg"
      style={{ height: "fit-content", color: "inherit" }}
    >
      {quizList ? (
        <Grid container sx={{ flexGrow: 1, width: "100%", color: "inherit" }}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              {quizList.quizList.map((Quiz: Quiz) => (
                <Grid key={Quiz._id} item>
                  <Paper sx={{ color: "inherit", width: 250 }}>
                    <Card sx={{ flexGrow: 1, width: "100%", color: "inherit" }}>
                      <CardActionArea>
                        <CardMedia
                          sx={{ height: 140 }}
                          image={Quiz.quizImage}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {Quiz.quizName}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {Quiz.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => {
                            navigate(`/quiz/${Quiz._id}`);
                            dispatchQuiz({
                              type: "SET_QUIZ",
                              payload: { quizId: Quiz._id },
                            });
                            setCurrentQuestion(0);
                          }}
                        >
                          START QUIZ
                        </Button>

                        {/* <Button
                            href="https://en.wikipedia.org/wiki/Game_of_Thrones"
                            size="small"
                            color="primary"
                            target="_blank"
                          >
                            Learn More
                          </Button> */}
                      </CardActions>
                    </Card>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <div
          style={{
            textAlign: "center",
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      )}
    </Container>
  );
};
