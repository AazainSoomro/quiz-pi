import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Quiz = [
  {
    QuestionNumber: 1,
    Question: "This is q1? ",
    Options: ["a", "b", "c", "d"],
    Answer: "a",
  },
  {
    QuestionNumber: 2,
    Question: "This is q2? ",
    Options: ["a", "b", "c", "d"],
    Answer: "c",
  },
  {
    QuestionNumber: 3,
    Question: "This is q3? ",
    Options: ["a", "b", "c", "d"],
    Answer: "d",
  },
];

function TakeQuiz({ Quiz }) {
  console.log("this is inside createQuiz:", Quiz);

  const [I, setI] = useState(1);
  const [CurrentMcq, setCurrentMcq] = useState(Quiz[0]);
  const [RecordedAnswer, setRecordedAnswer] = useState("");
  const [Score, setScore] = useState(0);
  const [IsQuestionValid, setIsQuestionValid] = useState(false);
  const [IsQuestion, setIsQuestion] = useState(true);
  const [IsFinish, setIsFinish] = useState(false);
  //
  const [QuestionNumber, setQuestionNumber] = useState();
  const [Question, setQuestion] = useState("");
  const [Options, setOptions] = useState([]);
  const [Answer, setAnswer] = useState("");
  const [QuestionInvalidMsg, setQuestionInvalidMsg] = useState("");

  //Handling the next question click button
  const HandleNextQuestionClick = () => {
    if (RecordedAnswer === "") setQuestionInvalidMsg("Please select Answer!");
    if (I === Quiz.length - 1) setIsQuestion(false);
    if (I < Quiz.length) {
      setCurrentMcq(Quiz[I]);
      setI(I + 1);
      setRecordedAnswer("");
    }
  };

  // handling the finish button click
  const HandleFinishQuestionClick = () => {
    setQuestionNumber(0);
    setIsFinish(false);
  };

  // Handling option click button
  const HandleOptionClick = (item) => {
    if (RecordedAnswer === "") {
      setRecordedAnswer(item);
      setIsQuestionValid(true);
      setQuestionInvalidMsg("");
    }
    if (item === Answer) setScore(Score + 5);
    if (!IsQuestion) setIsFinish(true);
  };

  // Returning the className of item
  const RecordedAnswerValue = (index, item) => {
    if (RecordedAnswer === item) {
      if (Answer === RecordedAnswer) {
        return "text-lg py-2 px-4 my-4 font-bold bg-green-400 text-purple-950 rounded-lg w-full";
      } else {
        return "text-lg py-2 px-4 my-4 font-bold  bg-red-500  text-purple-950 rounded-lg w-full";
      }
    } else
      return "text-lg py-2 px-4 my-4 font-bold  bg-purple-200 text-purple-950 rounded-lg w-full";
    if (RecordedAnswer != item)
      return "text-lg py-2 px-4 my-4 font-bold  bg-red-500  text-purple-950 rounded-lg w-full";
  };

  //
  useEffect(() => {
    setQuestionNumber(CurrentMcq.QuestionNumber);
    setQuestion(CurrentMcq.Question);
    setOptions(CurrentMcq.Options);
    setAnswer(CurrentMcq.Answer);
  }, [HandleNextQuestionClick]);
  //

  return (
    <div>
      <motion.div
        transition={{ delay: 1, stiffness: 200 }}
        animate={{ y: 0 }}
        initial={{ y: -800 }}
        className={IsFinish ? "hidden" : "flex justify-between items-baseline"}
      >
        <h1 className="text-2xl font-bold">
          Score: <span className="text-green-400">{Score}</span>
        </h1>
        <h1 className="px-2 font-bold text-end">
          Click on the correct answer to choose!
        </h1>
      </motion.div>
      <motion.div
        animate={{ x: 0 }}
        initial={{ x: 800 }}
        className={
          IsFinish
            ? "hidden"
            : "w-[450px] min-h-[400px] font-bold p-8 px-8 bg-purple-950 rounded-2xl"
        }
      >
        <h1 className="text-2xl py-2 pb-4 text-purple-200">
          <span className="">
            {QuestionNumber ? "Q" + QuestionNumber + ": " : ""}{" "}
          </span>
          {Question}
        </h1>
        {Options.map((item, index) => (
          <h1
            key={index}
            onClick={() => HandleOptionClick(item)}
            // className={
            //   RecordedAnswer === item
            //     ? Answer === RecordedAnswer
            //       ? "text-lg py-2 px-4 my-4 font-bold bg-green-400 text-purple-950 rounded-lg w-full"
            //       : "text-lg py-2 px-4 my-4 font-bold  bg-red-500  text-purple-950 rounded-lg w-full"
            //     : "text-lg py-2 px-4 my-4 font-bold  bg-purple-200 text-purple-950 rounded-lg w-full"
            // }
            className={RecordedAnswerValue(index, item)}
          >
            {item}
          </h1>
        ))}
      </motion.div>
      <h1 className="text-red-600 text-center font-bold">
        {QuestionInvalidMsg}
      </h1>
      <motion.div animate={{ x: 0 }} initial={{ x: 800 }}>
        <h1 className={IsFinish ? "text-3xl font-bold p-6" : "hidden"}>
          <span className="text-purple-900">Congratulations!</span> You have
          Scored <span className="text-green-400">{Score}</span> out of{" "}
          <span className="text-yellow-400">{Score * Quiz.length}</span>
        </h1>
      </motion.div>
      <motion.div
        transition={{ delay: 1, stiffness: 200 }}
        animate={{ y: 0 }}
        initial={{ y: 800 }}
        className="py-2 space-x-4 flex justify-center"
      >
        <Link
          to="/home"
          onClick={HandleFinishQuestionClick}
          className="hover:bg-purple-100 text-white rounded-md px-4 py-4 text-xl text-center bg-purple-950 hover:text-purple-950 duration-300 w-40"
        >
          FINISH
        </Link>

        <button
          onClick={HandleNextQuestionClick}
          className={
            IsQuestion
              ? "hover:bg-purple-100 text-white rounded-md px-4 py-4 text-xl text-center bg-purple-950 hover:text-purple-950 duration-300 w-40"
              : "hidden"
          }
        >
          NEXT
        </button>
      </motion.div>
    </div>
  );
}

export default TakeQuiz;
