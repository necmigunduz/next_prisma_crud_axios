import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import { FaTasks } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { LiaTasksSolid } from "react-icons/lia";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <Link href={"/"}>
          <div className="flex flex-row p-4">
            <FaTasks color="white" className="text-3xl" />
            <div className="text-white text-lg font-semibold px-6 hover:text-blue-300">
              TASK LIST
            </div>
          </div>
        </Link>
        <div className="flex space-x-5">
          <div className="flex space-x-2 items-center">
            <FaHome color="white" className="text-xl" />
            <Link
              href="/"
              className={`text-white hover:text-gray-300 cursor-pointer ${
                router.pathname === "/" && "border-b-2 border-white hover:border-blue-300"
              } hover:font-bold hover:text-blue-600`}
            >
              Home
            </Link>
          </div>
          <div className="flex flex-row space-x-2 items-center">
            <LiaTasksSolid color="white" className="text-xl" />
            <Link
              href="/tasks"
              className={`text-white hover:text-gray-300 cursor-pointer ${
                router.pathname.includes("/tasks") && "border-b-2 border-white hover:border-blue-600"
              } hover:font-bold hover:text-blue-300`}
            >
              Tasks
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
