"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathName = usePathname();
  const isAuth = pathName.startsWith("/admin");

  if (isAuth) return null;

  return (
    <footer className="font-sans tracking-wide bg-gradient-to-r from-[#116A7B] via-gray-700 to-[#116A7B]">
      <div className="px-12 py-12">
        <div className="flex flex-wrap items-center gap-6 sm:justify-between max-sm:flex-col">
          <div>
            <a href="javascript:void(0)">
              <img
                alt="logo"
                className="w-44 "
                src="https://readymadeui.com/readymadeui-light.svg"
              />
            </a>
          </div>
          <ul className="flex flex-wrap items-center justify-center space-x-6 gap-y-2 md:justify-end">
            <li>
              <a
                className="text-base text-gray-300 hover:underline"
                href="javascript:void(0)"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="text-base text-gray-300 hover:underline"
                href="javascript:void(0)"
              >
                About
              </a>
            </li>
            <li>
              <a
                className="text-base text-gray-300 hover:underline"
                href="javascript:void(0)"
              >
                Services
              </a>
            </li>
            <li>
              <a
                className="text-base text-gray-300 hover:underline"
                href="javascript:void(0)"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-500" />
        <p className="text-base text-center text-gray-300">
          © ReadymadeUI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
