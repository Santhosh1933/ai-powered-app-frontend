import React, { useRef } from "react";
import { logo, NavMenu } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { FcGoogle, FcMenu } from "react-icons/fc";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";

export const Navbar = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoaded, isSignedIn, user } = useUser();
  const btnRef = useRef();
  const location = useLocation();
  return (
    <div className="w-full bg-transparent">
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
                if (menu.navigate == "/dashboard") {
                  isLoaded && !isSignedIn
                    ? navigate("/")
                    : navigate(menu.navigate);
                } else {
                  navigate(menu.navigate);
                }
                onClose();
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
        <div className="flex items-baseline gap-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <div className="flex gap-2 py-1 px-3 border rounded-full transition-all hover:shadow-md hover:border-blue">
                <FcGoogle size={24} />
                Sign In
              </div>
            </SignInButton>
          </SignedOut>
          <FcMenu
            size={24}
            className="text-black md:hidden"
            ref={btnRef}
            onClick={onOpen}
          />
        </div>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              Welcome's to AI Powered Quiz Application
            </DrawerHeader>

            <DrawerBody>
              <ul
                className={`  grid font-medium py-8 text-md transition-all  cursor-pointer items-center gap-6 `}
              >
                {NavMenu.map((menu) => (
                  <>
                    <li
                      onClick={() => {
                        if (menu.navigate == "/dashboard") {
                          isLoaded && !isSignedIn
                            ? navigate("/")
                            : navigate(menu.navigate);
                        }else{
                          navigate(menu.navigate)
                        }
                        onClose();
                      }}
                      key={menu.name}
                      className={`hover:text-blue ${
                        location.pathname == menu.navigate && " text-blue"
                      }`}
                    >
                      {menu.name}
                    </li>
                    <hr />
                  </>
                ))}
              </ul>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};
