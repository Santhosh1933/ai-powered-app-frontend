import React from "react";
import { logo, NavMenu } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { FcGoogle } from "react-icons/fc";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="w-full bg-zinc-50 border-b ">
      <div className="container flex items-center cursor-pointer justify-between py-8">
        <img
          src={logo}
          alt=""
          width={30}
          height={30}
          onClick={() => {
            navigate("/");
          }}
        />
        <ul
          className={`  md:flex font-medium text-md transition-all  cursor-pointer items-center gap-6 hidden`}
        >
          {NavMenu.map((menu) => (
            <li
              onClick={() => {
                navigate(menu.navigate);
              }}
              key={menu.name}
              className={`hover:text-blue ${
                location.pathname == menu.navigate && " text-blue"
              }`}
            >
              {menu.name}
            </li>
          ))}
        </ul>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <div  className="flex gap-2 py-1 px-3 border rounded-full transition-all hover:shadow-md hover:border-blue">
              <FcGoogle size={24} />
              Sign In
            </div>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
};
