import React, { Dispatch } from "react";
import { useQuizPlay } from "../../hooks/useQuizPlay";
import { Button, CardMedia, Grid, Typography, useTheme } from "@mui/material";

export const QuizCard = ({
  setDisplayResult,
}: {
  setDisplayResult: Dispatch<boolean>;
}) => {
  const theme = useTheme();
  const {
    getCurrentQuestion,
    isLastQuestion,
    selectedOption,
    selectedValueIsRight,
    setSelectedValueIsRight,
    setselectedOption,
  } = useQuizPlay(setDisplayResult);
  return (
    <Grid item container xs={12}>
      <Grid item xs={12}>
        <CardMedia
          image={getCurrentQuestion?.questionImage}
          sx={{
            height: 250,
            width: "100%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        ></CardMedia>
        <Typography variant="h6" style={{ margin: "10px 0px" }} align="center">
          {getCurrentQuestion?.question}
        </Typography>
      </Grid>
      <div
        style={
          selectedOption
            ? { width: "100%", pointerEvents: "none", cursor: "no-drop" }
            : { width: "100%" }
        }
      >
        {getCurrentQuestion?.options.map((item, id) => {
          let bgcolor;
          if (selectedOption) {
            if (selectedValueIsRight && selectedOption === item._id) {
              bgcolor = theme.palette.success.light;
            }
            if (!selectedValueIsRight) {
              if (selectedOption === item._id) {
                bgcolor = theme.palette.error.light;
              } else if (item.isRight) {
                bgcolor = theme.palette.success.light;
              } else {
                bgcolor = "inherit";
              }
            }
          } else {
            bgcolor = "inherit";
          }

          return (
            <Button
              variant="contained"
              style={{
                backgroundColor: bgcolor || "inherit",
                marginBottom: "1rem",
                color: "inherit",
              }}
              size="large"
              fullWidth={true}
              onClick={() => {
                console.log(item);
                setselectedOption(item._id);
                setSelectedValueIsRight(item.isRight);
              }}
              key={item._id}
            >
              {item.value}
            </Button>
          );
        })}
      </div>
    </Grid>
  );
};
