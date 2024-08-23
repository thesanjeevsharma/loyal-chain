import React from "react";

import { NavBar } from "@/components";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default DashboardLayout;
