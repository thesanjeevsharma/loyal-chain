import React from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import { NavBar } from "@/components";
import { userState } from "@/store/user";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const router = useRouter();
  const user = useRecoilValue(userState);

  React.useEffect(() => {
    if (!user.address) {
      // user is not logged in
      router.push("/login");
    }
  }, [user.address]);

  if (!user.address) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-spinner text-secondary"></span>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default DashboardLayout;
