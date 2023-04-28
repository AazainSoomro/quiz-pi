import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function CreateQuiz({ setQuiz }) {
  const [AllQuestions, setAllQuestions] = useState([]);
  const [IsQuestionValid, setIsQuestionValid] = useState(false);
  const [QuestionNumber, setQuestionNumber] = useState(1);
  const [Question, setQuestion] = useState("");
  const [Options, setOptions] = useState([]);
  const [Answer, setAnswer] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [QuestionInvalidMsg, setQuestionInvalidMsg] = useState("");
  const [PlaceHolderText, setPlaceHolderText] = useState(
    "Enter the question..."
  );

  const HandleFinishQuestionClick = () => {
    setQuiz(AllQuestions);
    setAllQuestions([]);
    setQuestionNumber(0);
  };

  //Handling the next question click where everything is stored in a json file
  const HandleNextQuestionClick = () => {
    if (IsQuestionValid) {
      const data = {
        QuestionNumber: QuestionNumber,
        Question: Question,
        Options: Options,
        Answer: Answer,
      };
      setAllQuestions([...AllQuestions, data]);
      console.log(AllQuestions);
      setQuestionNumber(QuestionNumber + 1);
      setQuestion("");
      setOptions([]);
      setAnswer("");
      setInputValue("");
      setPlaceHolderText("Enter the question...");
      setIsQuestionValid(false);
      setQuestionInvalidMsg("");
    } else setQuestionInvalidMsg("Please select Answer!");
  };

  // Saving the input field text
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setQuestionInvalidMsg("");
  };

  // Handle Enter press to add a questions
  const handleKeyPress = (event) => {
    if (inputValue === "") setQuestionInvalidMsg("Please enter something!");
    else if (event.key === "Enter") {
      if (Question === "") {
        setQuestion(inputValue);

        setPlaceHolderText("Enter option...");
      } else {
        setOptions([...Options, inputValue]);
      }
      setInputValue("");
      setQuestionInvalidMsg("");
    }
  };
  return (
    <div>
      <motion.h1
        transition={{ delay: 1, stiffness: 200 }}
        animate={{ y: 0 }}
        initial={{ y: -800 }}
        className="px-2 font-bold"
      >
        Enter questions and click on the correct answer to choose!
      </motion.h1>
      <motion.div
        animate={{ x: 0 }}
        initial={{ x: 800 }}
        className="w-[450px] min-h-[400px] font-bold p-8 px-8 bg-purple-950 rounded-2xl"
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
            onClick={() => {
              setAnswer(item);
              setIsQuestionValid(true);
              setQuestionInvalidMsg("");
            }}
            className={
              Answer === item
                ? "text-lg py-2 px-4 my-4 font-bold bg-green-400 text-purple-950 rounded-lg w-full"
                : "text-lg py-2 px-4 my-4 font-bold bg-purple-200 text-purple-950 rounded-lg w-full"
            }
          >
            {item}
          </h1>
        ))}
        <input
          className=" px-4 py-2 bg-purple-200 text-purple-950 rounded-lg w-full text-lg"
          placeholder={PlaceHolderText}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
      </motion.div>
      <h1 className="text-red-600 text-center font-bold">
        {QuestionInvalidMsg}
      </h1>
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
          className="hover:bg-purple-100 text-white rounded-md px-4 py-4 text-xl text-center bg-purple-950 hover:text-purple-950 duration-300 w-40"
        >
          NEXT
        </button>
      </motion.div>
    </div>
  );
}

export default CreateQuiz;
