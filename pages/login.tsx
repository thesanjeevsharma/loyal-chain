// @ts-nocheck
import React from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { useRecoilState } from "recoil";

import { userState } from "@/store/user";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);

  const handleLogin = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      setUser({ address: signer.address, nfts: [] });
      document.cookie = `user-address=${signer.address}`;
      router.replace("/dashboard");
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  React.useEffect(() => {
    if (user && user.address) {
      // user is already logged in
      router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="h-screen flex items-center justify-center bg-pattern">
      <button className="btn btn-secondary text-white" onClick={handleLogin}>
        Login with MetaMask 🦊
      </button>
    </main>
  );
};

export default Login;
