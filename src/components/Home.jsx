import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home({ Quiz }) {
  console.log("this is inside home:", Quiz);
  return (
    <div className="">
      <motion.h1
        animate={{ opacity: 100 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 2 }}
        className="text-6xl text-purple-950 p-10"
      >
        Welcome to <span className="font-flawsome font-bold">QuizPi</span>
      </motion.h1>
      <div className=" space-x-4 flex justify-center ">
        <motion.div
          transition={{ delay: 1, stiffness: 500 }}
          animate={{ x: 0 }}
          initial={{ x: -800 }}
        >
          <Link
            to={Quiz.length > 0 ? "/takeQuiz" : "/quizNotFound"}
            className="hover:bg-purple-100 text-white rounded-md px-4 py-4 text-2xl text-center bg-purple-950 hover:text-purple-950 duration-300 w-40"
          >
            Take Quiz
          </Link>
        </motion.div>
        <motion.div
          transition={{ delay: 1, stiffness: 500 }}
          animate={{ x: 0 }}
          initial={{ x: 800 }}
        >
          <Link
            to="/createQuiz"
            className="hover:bg-purple-100 text-white rounded-md px-4 py-4 text-2xl text-center bg-purple-950 hover:text-purple-950 duration-300 w-40"
          >
            Create Quiz
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
