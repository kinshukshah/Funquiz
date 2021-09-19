import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import {QuizProvider} from "./context/QuizContext/quizContext";
import {ThemeProvider,createTheme} from '@material-ui/core/styles'

const customTheme=createTheme({
  palette:{
    type:"light"
  }
})
ReactDOM.render(
  <ThemeProvider theme={customTheme}>
  <BrowserRouter>
    <QuizProvider>
      <App />
    </QuizProvider>
  </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
