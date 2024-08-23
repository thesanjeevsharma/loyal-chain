import { Inter } from "next/font/google";

import type { NextPage } from "next";
import type { AppProps } from "next/app";

import RecoilContextProvider from "@/store";

import "@/styles/globals.css";

type GetLayoutFn = (page: React.ReactNode) => React.ReactNode;

const inter = Inter({ subsets: ["latin"] });

type AppPropsWithLayout = AppProps & {
  Component: NextPage & {
    getLayout?: (page: React.ReactNode) => React.ReactNode;
  };
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout: GetLayoutFn = Component.getLayout ?? ((page) => page);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <RecoilContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </RecoilContextProvider>
    </>
  );
}
