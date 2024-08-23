import React from "react";
import Link from "next/link";
import { useRecoilState } from "recoil";

import { userState } from "@/store/user";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);

  const handleLogout = () => {
    setUser({ address: null, nfts: [] });
    router.push("/login");
  };

  return (
    <nav className="navbar bg-base-100 border-b border-gray-700">
      <div className="flex-1">
        <Link href="/dashboard" className="btn btn-ghost text-xl">
          3stays.eth
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 z-50">
          <li>
            <span>{user.address}</span>
          </li>
          <li>
            <details>
              <summary>Account</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>
                  <span onClick={handleLogout}>Logout</span>
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
