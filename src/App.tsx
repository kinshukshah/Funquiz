import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { QuizList } from "./components/QuizList/QuizList.component";
import { Routes, Route } from "react-router-dom";
import { Quiz } from "./views/Quiz/Quiz";
import { Footer } from "./components/Footer/Footer.component";
import { SignIn } from "./views/SignIn/SignIn";
import { SignUp } from "./views/SignUp/SignUp";
import { PrivateRoute } from "./PrivateRoute";
import { UserDetails } from "./views/UserDetails/UserDetails";
import { createTheme, CssBaseline, Paper, ThemeProvider } from "@mui/material";
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function XYZ() {
  // const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <>
      <CssBaseline />
      <Paper sx={{ minHeight: "100vh" }}>
        <Header toggleColorMode={colorMode.toggleColorMode} />
        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/quiz/:quizId" element={<Quiz />} />
          <Route path="/quiz/detail/:quizId" element={<QuizList />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/user/detail"
            element={
              <PrivateRoute path="/user/detail">
                <UserDetails />
              </PrivateRoute>
            }
          />
        </Routes>
        {/* <Footer /> */}
      </Paper>
    </>
  );
}
function App() {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        localStorage.setItem(
          "FunQuizMode",
          mode === "light" ? "dark" : "light"
        );
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <XYZ />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
