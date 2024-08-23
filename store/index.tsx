import React from "react";
import { RecoilRoot } from "recoil";

type Props = {
  children: React.ReactNode;
};

const RecoilContextProvider = ({ children }: Props) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilContextProvider;
