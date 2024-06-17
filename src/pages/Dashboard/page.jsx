import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import { SignedIn, SignIn, UserButton, useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { json, useLocation, useNavigate } from "react-router-dom";
import { getPlanQuestionCount, getPlanQuizCount } from "../../../constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createQuiz, getQuizzes, getUser } from "../../Api/ApiFunctions";
import { chatSession } from "../../../GeminiAiModal";
import { FaDownload } from "react-icons/fa6";

export const Dashboard = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [aiLoading, setAiLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { data: userData, isPending: userIsPending } = useQuery({
    queryKey: ["user", isLoaded && user.id],
    queryFn: getUser,
    enabled: isLoaded,
  });

  const {
    data: quizData,
    isPending: quizIsPending,
    refetch,
  } = useQuery({
    queryKey: ["quiz", isLoaded && user.id],
    queryFn: getQuizzes,
    enabled: isLoaded,
  });

  const { mutate, isPending, isError, error, data } = useMutation({
    mutationKey: ["createQuiz"],
    mutationFn: createQuiz,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (!isSignedIn) {
    return <SignIn redirectUrl={location.pathname} />;
  }

  async function handleCreateQuiz(e) {
    e.preventDefault();

    try {
      setAiLoading(true);
      const prompt = `
      I will provide you with a quiz title : "${
        e.target[0].value
      }", quiz tech stack :"${e.target[1].value}", quiz level : "${
        e.target[2].value
      }". 
      Please generate a set of ${getPlanQuestionCount(
        userData?.plan
      )} creative quiz question exactly i need ${getPlanQuestionCount(
        userData?.plan
      )} questions in the specified format fo JSON  without considering any previous responses. The result should look like this:questions = [
      {
        question: "",
        options: [
          "",
          "",
          "",
          "",
        ],
        answer: "",
        explanation:
          "'",
      },
      // more questions here
    ]`;
      const result = await chatSession.sendMessage(prompt);
      const quizRes = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      if (JSON.parse(quizRes)) {
        mutate({
          userId: isLoaded && user.id,
          questions: JSON.parse(quizRes),
          level: e.target[2].value,
          description: e.target[1].value,
          title: e.target[0].value,
        });
      }
    } catch (error) {
    } finally {
      setAiLoading(false);
      if (!isPending) {
        onClose();
      }
    }
  }

  useEffect(() => {
    if (data) {
      refetch();
      navigate(`test/${data._id}`);
    }
  }, [isPending, data]);

  function handleGenerateCSV(title, data) {
    const csvContent = [
      ["Question", "Options", "Answer", "Explanation"],
      ...data.map((item) => [
        item.question,
        item.options.join("; "),
        item.answer,
        item.explanation,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${title}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const QuizCardLayout = ({ children }) => {
    return (
      <div className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    );
  };

  const QuizCard = ({ quiz }) => {
    return (
      <div className="relative cursor-pointer group">
        <div className="h-48 grid grid-rows-4 hover:shadow-lg gap-2 group-hover:bg-white  group-hover:-translate-x-2 group-hover:-translate-y-2 bg-zinc-50 p-4 rounded-md border  border-slate-500  transition-all">
          <div className="flex  items-baseline justify-between">
            <h1 className="text-lg sm:text-xl  text-blue font-medium">
              {quiz.title}
            </h1>
            {userData?.plan !== "free" && (
              <div
                onClick={() => {
                  handleGenerateCSV(quiz.title, quiz.questions);
                }}
                className=" bg-[#d6e0fa] p-2 rounded-full"
              >
                <FaDownload className="text-blue" />
              </div>
            )}
          </div>
          <p className="truncate  text-sm text-gray-600">{quiz.description}</p>
          <div className="flex justify-between  items-baseline">
            <p>{quiz.level}</p>
            <p>{quiz.createdAt}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {quiz.isCompleted && (
              <Button
                onClick={() => {
                  navigate(`review/${quiz._id}`);
                }}
              >
                Review
              </Button>
            )}
            <Button
              onClick={() => {
                navigate(`test/${quiz._id}`);
              }}
              className={` ${
                !quiz.isCompleted && " col-span-2 "
              } bg-blue hover:bg-[#2b5ad1] `}
              colorScheme=""
            >
              Take Text
            </Button>
          </div>
        </div>
        <span className="absolute opacity-0 -z-50 group-hover:opacity-100 transition-all inset-0 border-[3px] border-dashed border-slate-500 rounded-md"></span>
      </div>
    );
  };

  const QuizCardSkeleton = () => {
    return <Skeleton className="h-44"></Skeleton>;
  };

  return (
    <div>
      <div className="container py-8">
        <div className="min-h-[55vh]">
          <h1 className="text-xl sm:text-2xl font-semibold text-blue">
            Dashboard
          </h1>
          {quizIsPending ? (
            <QuizCardLayout>
              {Array.from({ length: 4 }, (_, index) => (
                <QuizCardSkeleton key={index} />
              ))}
            </QuizCardLayout>
          ) : (
            <QuizCardLayout>
              {getPlanQuizCount(userData?.plan) > quizData?.length && (
                <div
                  onClick={onOpen}
                  className="h-44 bg-slate-100 rounded-md border-[3px] border-slate-500 border-dashed flex justify-center items-center cursor-pointer hover:text-lg transition-all"
                >
                  + Add Quiz
                </div>
              )}
              {quizData.map((quiz, index) => (
                <QuizCard key={index} quiz={quiz} />
              ))}
            </QuizCardLayout>
          )}
        </div>

        <div className="w-full rounded-lg text-white flex flex-col p-4 text-center gap-4 bg-gradient-to-r from-blue to-[#2b5ad1] ">
          <h1 className="text-white text-xl sm:text-2xl">
            You're on the {userData?.plan} Plan
          </h1>
          <p className=" text-sm">
            You can create up to {getPlanQuizCount(userData?.plan)} quizzes,
            each containing up to {getPlanQuestionCount(userData?.plan)}{" "}
            questions. To extend your limits, consider upgrading your plan.
          </p>
          <p
            className="text-sm w-fit self-center underline cursor-pointer"
            onClick={() => {
              navigate("/upgrade");
            }}
          >
            Upgrade Plan
          </p>
          <div className="w-full sm:w-3/4 md:w-2/4 mx-auto">
            <Progress
              hasStripe
              value={
                (quizData?.length / getPlanQuizCount(userData?.plan)) * 100
              }
              colorScheme="green"
              className="rounded-full"
            />
          </div>
        </div>

        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your AI Quiz 🤖</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <form onSubmit={handleCreateQuiz} className="grid gap-4">
                <div className="grid gap-1">
                  <label
                    className="font-semibold cursor-pointer"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <Input
                    variant="flushed"
                    id="title"
                    placeholder="Ex . Frontend"
                    required
                  />
                </div>
                <div className="grid gap-1">
                  <label
                    className="font-semibold cursor-pointer"
                    htmlFor="TechStack"
                  >
                    Tech Stack
                  </label>
                  <Input
                    variant="flushed"
                    id="TechStack"
                    placeholder="Ex . React.Js , Node.Js"
                    required
                  />
                </div>
                <div className="grid gap-1">
                  <label
                    className="font-semibold cursor-pointer"
                    htmlFor="level"
                  >
                    Level
                  </label>
                  <select
                    id="level"
                    required
                    className="border-b py-2 outline-none"
                  >
                    <option selected>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advance</option>
                  </select>
                </div>

                <Button
                  isLoading={isPending || aiLoading}
                  loadingText="Creating"
                  type="submit"
                  className="bg-blue hover:bg-[#2b5ad1] "
                  colorScheme=""
                >
                  Create
                </Button>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
