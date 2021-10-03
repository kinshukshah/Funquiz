import React from "react";
import { Quiz } from "../../context/QuizContext/quiz.types";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext/quizContext";
import { CircularProgress, Container } from "@material-ui/core";

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
    media: {
      height: 140,
    },
  })
);

export const QuizList = () => {
  const { dispatchQuiz, quizList } = useQuiz();
  const classes = useStyles();
  let navigate = useNavigate();

  return (
    <Container maxWidth="lg" style={{ height: "fit-content" }}>
      <div>
        {quizList ? (
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={2}>
                {quizList.quizList.map((Quiz: Quiz) => (
                  <Grid key={Quiz._id} item>
                    <Paper className={classes.paper}>
                      <Card className={classes.root}>
                        <CardActionArea>
                          <CardMedia
                            className={classes.media}
                            image={Quiz.quizImage}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
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
      </div>
    </Container>
  );
};
