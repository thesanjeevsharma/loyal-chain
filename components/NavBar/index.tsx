import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { ethers } from "ethers";

import { userState } from "@/store/user";

const NavBar = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [ensName, setEnsName] = useState(user.address);

  const handleLogout = () => {
    setUser({ address: null, nfts: [] });
    document.cookie =
      "user-address" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/login");
  };

  React.useEffect(() => {
    if (user.address) {
      (async () => {
        const provider = new ethers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_ENS_NET
        );

        try {
          const ensName = await provider.lookupAddress(user.address);
          if (ensName) {
            setEnsName(ensName);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      })();
    }
  }, [user.address]);

  return (
    <nav className="navbar bg-base-100 border-b border-gray-700">
      <div className="flex-1">
        <Link href="/dashboard" className="btn btn-ghost text-xl">
          LoyalChain
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 z-50">
          <li>
            <span>{ensName}</span>
          </li>
          <li>
            <details>
              <summary>Account</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>
                  <Link href="/dashboard/collection">Collection</Link>
                </li>
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
