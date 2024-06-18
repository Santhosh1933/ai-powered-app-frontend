import React from "react";
import { useNavigate } from "react-router-dom";

export const Guide = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container py-12">
        <h1 className="text-xl sm:text-2xl text-blue font-medium">
          Step-by-Step Guide to Create Quizzes on AI Quiz Generator
        </h1>

        <div className="py-8 grid gap-6">
          {/* Landing Page */}
          <div className="grid gap-3 bg-[#eaf0fd] p-4 rounded-md border border-blue">
            <div>
              <h1
                className="text-xl cursor-pointer text-blue font-medium"
                onClick={() => navigate("/")}
              >
                Landing Page
              </h1>
            </div>
            <div className="text-gray-700">
              <h3 className="text-lg">Login:</h3>
              <li>On the top right corner, click the "Login" button.</li>
              <li>After logging in, the "Login" button will change to display your email.</li>
            </div>
          </div>

          {/* Dashboard */}
          <div className="grid gap-3 bg-[#eaf0fd] p-4 rounded-md border border-blue">
            <div>
              <h1
                className="text-xl cursor-pointer text-blue font-medium"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </h1>
            </div>
            <div className="text-gray-700">
              <h3 className="text-lg">Accessing Dashboard:</h3>
              <li>Click "Generate Quizzes" to be redirected to your dashboard.</li>
              <li>The dashboard displays previously created quizzes with options to review or take the test again.</li>
            </div>
          </div>

          {/* Creating a New Quiz */}
          <div className="grid gap-3 bg-[#eaf0fd] p-4 rounded-md border border-blue">
            <div>
              <h1
                className="text-xl cursor-pointer text-blue font-medium"
                onClick={() => navigate("/dashboard")}
              >
                Creating a New Quiz
              </h1>
            </div>
            <div className="text-gray-700">
              <h3 className="text-lg">Add Quiz:</h3>
              <li>Click the "Add Quiz" button.</li>
              <li>Note: The free version allows creating up to 5 quizzes, each with 10 questions.</li>
            </div>
            <div className="text-gray-700">
              <h3 className="text-lg">Create Quiz Dialog:</h3>
              <li>A dialog box will pop up where you need to fill in the quiz details.</li>
              <li>After filling in the details, click the "Create" button to generate and store the quiz.</li>
              <li>You will be automatically redirected to the test screen.</li>
            </div>
          </div>

          {/* Taking the Quiz */}
          <div className="grid gap-3 bg-[#eaf0fd] p-4 rounded-md border border-blue">
            <div>
              <h1
                className="text-xl cursor-pointer text-blue font-medium"
                onClick={() => navigate("/dashboard")}
              >
                Taking the Quiz
              </h1>
            </div>
            <div className="text-gray-700">
              <h3 className="text-lg">Answering Questions:</h3>
              <li>Answer all the questions presented on the test screen.</li>
              <li>Once finished, press the "Submit" button.</li>
            </div>
            <div className="text-gray-700">
              <h3 className="text-lg">Submitting Quiz:</h3>
              <li>The quiz answers will be submitted to the database.</li>
              <li>You will be redirected to the review page.</li>
            </div>
          </div>

          {/* Reviewing the Quiz */}
          <div className="grid gap-3 bg-[#eaf0fd] p-4 rounded-md border border-blue">
            <div>
              <h1
                className="text-xl cursor-pointer text-blue font-medium"
                onClick={() => navigate("/dashboard")}
              >
                Reviewing the Quiz
              </h1>
            </div>
            <div className="text-gray-700">
              <h3 className="text-lg">Review Page:</h3>
              <li>On the review page, you can see your scores, correct answers, and explanations.</li>
              <li>You can access and review the quiz as many times as needed.</li>
            </div>
          </div>

          {/* Downloading Quiz Data */}
          <div className="grid gap-3 bg-[#eaf0fd] p-4 rounded-md border border-blue">
            <div>
              <h1
                className="text-xl cursor-pointer text-blue font-medium"
                onClick={() => navigate("/dashboard")}
              >
                Downloading Quiz Data
              </h1>
            </div>
            <div className="text-gray-700">
              <h3 className="text-lg">Download Quiz:</h3>
              <li>Click the download icon on the quiz card to download the quiz questions, options, answers, and explanations in CSV format.</li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
