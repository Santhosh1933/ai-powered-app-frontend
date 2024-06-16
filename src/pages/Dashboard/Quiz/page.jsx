import { Breadcrumb, BreadcrumbItem, Button } from "@chakra-ui/react";
import { SignIn, useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getQuiz, postAnswer } from "../../../Api/ApiFunctions";

export const Quiz = () => {
  const navigate = useNavigate();
  const { isLoaded, user } = useUser();
  const location = useLocation();
  const quizId = location.pathname.split("/")[3];

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["getQuiz", isLoaded && user.id, quizId],
    queryFn: getQuiz,
    enabled: isLoaded,
  });

  const { mutate, isPending: mutatePending,data:mutateData } = useMutation({
    mutationKey: ["postAnswers"],
    mutationFn: postAnswer,
  });

  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [answers, setAnswers] = useState(
    Array(data?.questions.length).fill(null)
  );

  function handleQuestionChange(ope) {
    switch (ope) {
      case "prev":
        if (selectedQuestion > 0) {
          setSelectedQuestion(selectedQuestion - 1);
        }
        break;

      case "next":
        if (selectedQuestion < data?.questions.length - 1) {
          setSelectedQuestion(selectedQuestion + 1);
        } else {
          mutate({
            userId: isLoaded && user.id,
            quizId,
            answers: answers,
          });
        }
        break;

      default:
        break;
    }
  }
  const isLastQuestion = selectedQuestion === data?.questions.length - 1;

  useEffect(() => {
    if (isError) {
      navigate("/dashboard");
    }
    if(mutateData){
      navigate(`/dashboard/review/${quizId}`)
    }
  }, [isPending,mutatePending,mutateData]);

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
      {isPending ? (
        <>Loading....</>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="bg-zinc-50 grid gap-3 border p-4">
            <h1 className="text-xl sm:text-2xl font-semibold text-blue">
              {data?.title}
            </h1>
            <p className="text-gray-600">{data?.description}</p>
            <p className="font-semibold"> {data?.level}</p>
            <p> {data?.createdAt}</p>
          </div>
          <div className="bg-zinc-50 md:col-span-2 flex flex-col gap-6 border p-4">
            <h1 className="text-xl  font-semibold text-blue">
              {selectedQuestion + 1} ){" "}
              {data?.questions[selectedQuestion].question}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data?.questions[selectedQuestion].options.map(
                (option, index) => (
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
                )
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => handleQuestionChange("prev")}
                disabled={selectedQuestion === 0}
              >
                Previous
              </Button>
              <Button
                isLoading={mutatePending}
                loadingText="Posting Answers"
                onClick={() => handleQuestionChange("next")}
                className="bg-blue hover:bg-[#2b5ad1] "
                colorScheme=""
              >
                {isLastQuestion ? "Submit" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
