import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="text-white text-lg font-semibold px-6">TASK LIST</div>
        <div className="flex space-x-4">
          <Link
            href="/"
            className={`text-white hover:text-gray-300 cursor-pointer ${
              router.pathname === "/" && "border-b-2 border-white"
            }`}
          >
            Home
          </Link>
          <Link
            href="/tasks"
            className={`text-white hover:text-gray-300 cursor-pointer ${
              router.pathname.includes("/tasks") && "border-b-2 border-white"
            }`}
          >
            Tasks
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
