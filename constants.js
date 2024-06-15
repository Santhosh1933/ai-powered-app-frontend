import PrimaryLogo from "./src/assets/logo.svg";
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

export function getPlanQuizCount(plan) {
  switch (plan) {
    case "free":
      return 5;

    default:
      break;
  }
}
