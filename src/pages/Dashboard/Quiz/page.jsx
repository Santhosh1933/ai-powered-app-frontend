import { Breadcrumb, BreadcrumbItem, Button } from "@chakra-ui/react";
import { SignIn, useUser } from "@clerk/clerk-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Quiz = () => {
  const navigate = useNavigate();


  const questions = [
    {
      question: "What is the purpose of the 'useState' hook in ReactJS?",
      options: [
        "To manage component state",
        "To handle user input",
        "To perform asynchronous operations",
        "To define component styles",
      ],
      answer: "To manage component state",
      explanation:
        "'useState' is a React hook that allows you to manage the state of a component. It returns an array containing the current state value and a function to update that value.",
    },
    {
      question:
        "Which of the following is NOT a valid way to pass data from a parent component to a child component in ReactJS?",
      options: [
        "Using props",
        "Using context",
        "Using global variables",
        "Using a callback function",
      ],
      answer: "Using global variables",
      explanation:
        "Global variables are not recommended for passing data between components in React. It leads to less predictable and maintainable code.",
    },
    {
      question: "What is the role of the 'useEffect' hook in ReactJS?",
      options: [
        "To render the component",
        "To handle component lifecycle events",
        "To define component styles",
        "To perform data fetching",
      ],
      answer: "To handle component lifecycle events",
      explanation:
        "'useEffect' allows you to perform side effects in your components, such as data fetching, setting up subscriptions, or interacting with the DOM. It runs after each render.",
    },
    {
      question: "What is the purpose of the 'key' prop in ReactJS?",
      options: [
        "To identify unique elements in a list",
        "To control the order of elements",
        "To style elements",
        "To add event listeners",
      ],
      answer: "To identify unique elements in a list",
      explanation:
        "The 'key' prop helps React identify which list items have changed, added, or removed. It's crucial for efficient rendering and updates.",
    },
    {
      question:
        "Which of the following is a popular state management library for ReactJS?",
      options: ["Redux", "Django", "Flask", "Node.js"],
      answer: "Redux",
      explanation:
        "Redux is a widely used state management library for React. It helps manage complex application state and provides a predictable and centralized way to update it.",
    },
    {
      question:
        "What is the purpose of the 'componentDidMount' lifecycle method in ReactJS?",
      options: [
        "To initialize the component state",
        "To update the component state",
        "To perform data fetching and side effects",
        "To clean up resources after the component unmounts",
      ],
      answer: "To perform data fetching and side effects",
      explanation:
        "'componentDidMount' is called after the component is rendered. It's commonly used for data fetching, setting up subscriptions, or performing DOM manipulations.",
    },
    {
      question:
        "What is the difference between 'props' and 'state' in ReactJS?",
      options: [
        "Props are immutable, while state is mutable",
        "Props are used to pass data down, while state is used to manage internal data",
        "Props are defined in the parent component, while state is defined in the child component",
        "All of the above",
      ],
      answer: "All of the above",
      explanation:
        "Props are used to pass data from parent components to child components, while state is used to manage the internal data of a component. Props are immutable, meaning they cannot be changed directly within the child component, while state is mutable.",
    },
    {
      question: "What is the purpose of the 'render' method in ReactJS?",
      options: [
        "To update the component state",
        "To define the component's structure and appearance",
        "To handle user events",
        "To perform data fetching",
      ],
      answer: "To define the component's structure and appearance",
      explanation:
        "The 'render' method is responsible for returning the JSX representation of the component. It determines what is displayed on the screen.",
    },
    {
      question: "What is the main advantage of using a virtual DOM in ReactJS?",
      options: [
        "Improved performance",
        "Simplified development",
        "Reduced code complexity",
        "Enhanced security",
      ],
      answer: "Improved performance",
      explanation:
        "React's virtual DOM provides improved performance by minimizing the number of actual DOM updates. It compares the virtual DOM to the real DOM and updates only the necessary elements.",
    },
    {
      question:
        "Which of the following is a way to create reusable components in ReactJS?",
      options: [
        "Using functions",
        "Using classes",
        "Using both functions and classes",
        "Using global variables",
      ],
      answer: "Using both functions and classes",
      explanation:
        "React allows you to create reusable components using both function components and class components. Both approaches have their advantages and are commonly used in React development.",
    },
  ];

  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  function handleQuestionChange(ope) {
    switch (ope) {
      case "prev":
        if (selectedQuestion > 0) {
          setSelectedQuestion(selectedQuestion - 1);
        }
        break;

      case "next":
        if (selectedQuestion < questions.length - 1) {
          setSelectedQuestion(selectedQuestion + 1);
        } else {
          console.log("Quiz Results:", answers);
        }
        break;

      default:
        break;
    }
  }
  const isLastQuestion = selectedQuestion === questions.length - 1;
  return (
    <div className="container py-8">
      <Breadcrumb
        spacing="8px"
        className="pb-6"
        //   separator={< color="gray.500" />}
      >
        <BreadcrumbItem>
          <p
            className="cursor-pointer hover:text-blue transition-all"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </p>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <p
            className="cursor-pointer hover:text-blue transition-all"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </p>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <p className="cursor-pointer hover:text-blue transition-all">Quiz</p>
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="bg-zinc-50 grid gap-3 border p-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-blue">
            Frontend
          </h1>
          <p className="text-gray-600">
            React.js, Node.js, MongoDB, SQL, Express.js
          </p>
          <p className="font-semibold">Intermediate</p>
          <p>27 May 2024</p>
        </div>
        <div className="bg-zinc-50 md:col-span-2 flex flex-col gap-6 border p-4">
          <h1 className="text-xl  font-semibold text-blue">
            {selectedQuestion + 1} ) {questions[selectedQuestion].question}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {questions[selectedQuestion].options.map((option, index) => (
              <div
                onClick={() => {
                  let temp = [...answers];
                  temp[selectedQuestion] = option;
                  setAnswers(temp);
                }}
                key={index}
                className={` p-2  rounded-md cursor-pointer  ${
                  option == answers[selectedQuestion]
                    ? " text-white bg-blue "
                    : " bg-gray-100 "
                }`}
              >
                {option}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => handleQuestionChange("prev")}
              disabled={selectedQuestion === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() => handleQuestionChange("next")}
              className="bg-blue hover:bg-[#2b5ad1] "
              colorScheme=""
            >
              {isLastQuestion ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
