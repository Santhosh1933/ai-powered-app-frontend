import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { SignIn, useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getQuiz, getReview } from "../../../Api/ApiFunctions";
import { useQuery } from "@tanstack/react-query";

export const Review = () => {
  const navigate = useNavigate();
  const { isLoaded, user } = useUser();
  const location = useLocation();
  const quizId = location.pathname.split("/")[3];

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["getReview", isLoaded && user.id, quizId],
    queryFn: getReview,
    enabled: isLoaded,
  });

  useEffect(() => {
    console.log(data, isPending, isError, error);
    if (isError) {
      navigate("/dashboard");
    }
  }, [isPending, isError]);

  const AnswerSession = ({ question, i }) => {
    return (
      <div className="grid gap-4">
        <h1
          className={`text-lg font-semibold ${
            question.isCorrect ? " text-green-600 " : " text-red-600 "
          }`}
        >
          {i + 1} ) {question.question}
        </h1>
        <p>Answer : {question.correctAnswer}</p>
        <div className="bg-yellow-100 p-4 rounded-md text-yellow-800">
          {question.explanation}
        </div>
      </div>
    );
  };

  return (
    <div>
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
            <p className="cursor-pointer hover:text-blue transition-all">
              Review
            </p>
          </BreadcrumbItem>
        </Breadcrumb>
        <div>
          {isPending || isError ? (
            <>Loading...</>
          ) : (
            <>
              <div className="grid text-center sm:text-start gap-4 ">
                <h1 className="text-xl sm:text-3xl font-semibold text-blue">
                  {data?.title}
                </h1>
                <p className="text-gray-600">{data?.description}</p>
                <div className="flex justify-center sm:justify-start gap-x-6 flex-wrap">
                  <p className="font-semibold"> {data?.level}</p>
                  <p> {data?.createdAt}</p>
                </div>
              </div>
              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-blue sm:text-4xl">
                  {data?.totalScore}
                </strong>

                <span className="text-sm font-medium text-gray-700">
                  / {data?.questions.length}
                </span>
              </p>

              <div className="grid gap-6">
                {data?.questions.map((question, i) => (
                  <AnswerSession question={question} i={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
