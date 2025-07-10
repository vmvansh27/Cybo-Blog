import React, { useState } from "react";
// import logo from '@/assets/images/logo-white.png'
import logo from "@/assets/images/logo.png";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import SearchBox from "./SearchBox";
import {
  RouteBlogAdd,
  RouteIndex,
  RouteProfile,
  RouteSignIn,
} from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import usericon from "@/assets/images/user.png";

import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoLogOutOutline, IoSearch } from "react-icons/io5";
import { removeUser } from "@/redux/user/user.slice";
import { showToast } from "@/helpers/showToast";
import { getEvn } from "@/helpers/getEnv";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { useSidebar } from "./ui/sidebar";

const Topbar = () => {
  const { toggleSidebar } = useSidebar();
  const [showSearch, setShowSearch] = useState(false);
  const dispath = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${getEvn("VITE_API_BASE_URL")}/auth/logout`,
        {
          method: "get",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      dispath(removeUser());
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="flex justify-between items-center h-14 fixed w-full z-20 bg-bluee px-5 border-b">
      <div className="flex  items-center gap-2">
        <button onClick={toggleSidebar} className="md:hidden" type="button" style={{ color: "white" }}>
          <AiOutlineMenu />
        </button>
        {/* <Link
          to={RouteIndex}
          className="object-contain w-auto h-10" // Changed from w-100 to w-auto and set fixed height
        >
          <img src={logo} className="h-full w-auto" />
        </Link> */}

        <Link
          to={RouteIndex}
          className="object-contain h-16 sm:h-10 w-auto" // Even larger on mobile (h-16 = 64px)
        >
          <img
            src={logo}
            className="h-full w-auto max-w-[180px] sm:max-w-none" // Constrains mobile width
            alt="Company Logo"
          />
        </Link>
      </div>
      <div className="w-[500px]">
        <div
          className={`md:relative md:block absolute bg-white  left-0 w-full md:top-0 top-16 md:p-0 p-5 ${showSearch ? "block" : "hidden"
            }`}
        >
          <SearchBox />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button
          onClick={toggleSearch}
          type="button"
          className="md:hidden block"
        >
          <IoMdSearch size={25} />
        </button>


        {user.isLoggedIn && (
          <Button
            onClick={handleLogout}
            className="rounded-full flex items-center gap-2"
          >
            <IoLogOutOutline />
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Topbar;
