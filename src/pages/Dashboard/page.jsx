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
  useDisclosure,
} from "@chakra-ui/react";
import { SignedIn, SignIn, UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPlanQuizCount } from "../../../constants";

export const Dashboard = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();

  const quizCount = getPlanQuizCount("free");

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (!isSignedIn) {
    return <SignIn redirectUrl={location.pathname} />;
  }

  async function handleCreateQuiz(e) {
    e.preventDefault();
    console.log(e.target[0].value, e.target[1].value, e.target[2].value);
    onClose();
  }

  const QuizCardLayout = ({ children }) => {
    return (
      <div className="py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {children}
      </div>
    );
  };
  const QuizCard = (props) => {
    return (
      <div className="relative cursor-pointer group">
        <div className="h-44 flex flex-col hover:shadow-lg gap-2 group-hover:bg-white  group-hover:-translate-x-2 group-hover:-translate-y-2 bg-zinc-50 p-4 rounded-md border  border-slate-500  transition-all">
          <h1 className="text-lg sm:text-xl text-blue font-medium">
            Frontend Developer
          </h1>
          <p className="line-clamp-1  text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
            consectetur adipisci, quidem dolor voluptas minus natus, iusto,
            laudantium totam necessitatibus temporibus soluta ratione ut ab
            minima fuga sunt non inventore!
          </p>
          <div className="flex justify-between  items-baseline">
            <p>Intermediate</p>
            <p>May 27 2024</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button>Review</Button>
            <Button onClick={()=>{
              navigate(`test/1`)
            }} className="bg-blue hover:bg-[#2b5ad1] " colorScheme="">
              Take Text
            </Button>
          </div>
        </div>
        <span className="absolute opacity-0 -z-50 group-hover:opacity-100 transition-all inset-0 border-[3px] border-dashed border-slate-500 rounded-md"></span>
      </div>
    );
  };

  return (
    <div>
      <div className="container py-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-blue">
          Dashboard
        </h1>
        <QuizCardLayout>
          {4 < quizCount && (
            <div
              onClick={onOpen}
              className="h-44 bg-slate-100 rounded-md border-[3px] border-slate-500 border-dashed flex justify-center items-center cursor-pointer hover:text-lg transition-all"
            >
              + Add Quiz
            </div>
          )}
          <QuizCard />
          <QuizCard />
          <QuizCard />
          <QuizCard />
          <QuizCard />
          <QuizCard />
        </QuizCardLayout>

        <div className="w-full rounded-lg text-white flex flex-col p-4 text-center gap-4 bg-gradient-to-r from-blue to-[#2b5ad1] h-40">
          <h1 className="text-white text-xl sm:text-2xl">
            You're on the Free Plan
          </h1>
          <p className=" text-sm">
            You can create up to 5 quizzes, each containing up to 10 questions.
            To extend your limits, consider upgrading your plan.
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
              value={20}
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
