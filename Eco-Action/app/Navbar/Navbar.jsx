import Link from "next/link";
import { Menu } from "lucide-react";
import LogoutButton from "../LogoutButton";

export default function Navbar({ token }) {
  return (
    <nav className="bg-gradient-to-r from-green-500 to-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-white text-xl font-bold">
              Eco-Action Tracking
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md"
                href="/"
              >
                Home
              </Link>

              {!token && (
                <Link
                  className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md"
                  href="/login"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center justify-end space-x-4 w-full">
            {token && <LogoutButton />}
            <button className="text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20 ml-4 md:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
