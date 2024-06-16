import { endUrl } from "../../constants";

export async function getUser({ queryKey }) {
  const [, userId] = queryKey;
  const response = await fetch(`${endUrl}/user?userId=${userId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
export async function createQuiz({
  userId,
  questions,
  level,
  description,
  title,
}) {
  const response = await fetch(`${endUrl}/quizzes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, questions, level, description, title }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
export async function getQuizzes({ queryKey }) {
  const [, userId] = queryKey;
  const response = await fetch(`${endUrl}/quizzes?userId=${userId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function getQuiz({ queryKey }) {
  const [, userId, quizId] = queryKey;
  const response = await fetch(`${endUrl}/quizzes/${userId}/${quizId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function postAnswer({ userId, quizId, answers }) {
  const response = await fetch(`${endUrl}/answers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, quizId, answers }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function getReview({ queryKey }) {
  const [, userId, quizId] = queryKey;
  const response = await fetch(`${endUrl}/quizzes/review/${userId}/${quizId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
