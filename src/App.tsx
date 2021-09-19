import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { QuizList } from "./components/QuizList/QuizList.component";
import { Routes, Route } from "react-router-dom";
import { Quiz } from "./views/Quiz/Quiz";
import { Footer } from "./components/Footer/Footer.component";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/quiz/:quizId" element={<Quiz />} />
        <Route path="/quiz/detail/:quizId" element={<QuizList />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
