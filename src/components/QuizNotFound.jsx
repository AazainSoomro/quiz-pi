import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
function QuizNotFound() {
  return (
    <div>
      <motion.h1
        initial={{ y: -2000 }}
        animate={{ y: 0 }}
        className="text-5xl font-bold p-10"
      >
        Oops, Quiz not found!
      </motion.h1>
      <motion.div
        initial={{ y: 2000 }}
        animate={{ y: 0 }}
        transition={{ stiffness: 100, delay: 1 }}
        className=" space-x-4 flex justify-center "
      >
        <Link
          to="/createQuiz"
          className="hover:bg-purple-100 text-white rounded-md px-4 py-4 text-2xl text-center bg-purple-950 hover:text-purple-950 duration-300 w-40"
        >
          Create Quiz
        </Link>
      </motion.div>
    </div>
  );
}

export default QuizNotFound;
