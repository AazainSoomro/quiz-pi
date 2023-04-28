import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import Home from "./components/Home";
import QuizNotFound from "./components/QuizNotFound";
import CreateQuiz from "./components/CreateQuiz";
import TakeQuiz from "./components/TakeQuiz";

function App() {
  const [isQuizPath, setisQuizPath] = useState("");
  const [Quiz, setQuiz] = useState([]);

  useEffect(() => {
    Quiz.length > 0
      ? setisQuizPath("/takeQuiz")
      : setisQuizPath("/quizNotFound");
  }, []);

  console.log("This is main quiz", Quiz);

  return (
    <div className="bg-gradient-to-r from-purple-300 to-purple-500  h-screen flex justify-center items-center ">
      <motion.div
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 2 }}
        className="absolute w-64 h-64 -left-20 -top-20 rounded-full bg-purple-950 overflow-hidden"
      />
      <motion.div
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ duration: 2 }}
        className="absolute w-40 h-40 left-20 -top-20  rounded-full bg-purple-900 "
      />
      <div className="z-30">
        <Router>
          <Routes>
            <Route index path="home" element={<Home Quiz={Quiz} />} />
            <Route path="/quizNotFound" element={<QuizNotFound />} />
            <Route path="takeQuiz" element={<TakeQuiz Quiz={Quiz} />} />
            <Route
              path="createQuiz"
              element={<CreateQuiz setQuiz={setQuiz} />}
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
