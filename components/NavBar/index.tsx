import React from "react";

import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="navbar bg-base-100 border-b border-gray-700">
      <div className="flex-1">
        <Link href="/dashboard" className="btn btn-ghost text-xl">
          3stays.eth
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>0xdummyaddress0101</a>
          </li>
          <li>
            <details>
              <summary>Account</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
