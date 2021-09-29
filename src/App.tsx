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
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/quiz/:quizId" element={<Quiz />} />
        <Route path="/quiz/detail/:quizId" element={<QuizList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <PrivateRoute path="/user/detail" element={<UserDetails/>}/>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
