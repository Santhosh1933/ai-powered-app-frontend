import PrimaryLogo from "./src/assets/logo.svg";
import HeroImage from "./src/assets/image.png";
export const NavMenu = [
  {
    name: "Dashboard",
    navigate: "/dashboard",
  },
  {
    name: "Upgrade",
    navigate: "/upgrade",
  },
  {
    name: "How It works?",
    navigate: "/faq",
  },
];

export const logo = PrimaryLogo;
export const heroImage = HeroImage;

export function getPlanQuizCount(plan) {
  switch (plan) {
    case "free":
      return 5;
    case "premium":
      return 30;

    default:
      break;
  }
}
export function getPlanQuestionCount(plan) {
  switch (plan) {
    case "free":
      return 10;
    case "premium":
      return 15;

    default:
      break;
  }
}

export const endUrl =
  import.meta.env.VITE_DEVELOPMENT == "true"
    ? "http://localhost:8000"
    : "https://ai-powered-app-backend.onrender.com";
