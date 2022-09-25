import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppContainer from "../components/layout/AppContainer";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { SessionProvider } from "next-auth/react";
import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from "@rainbow-me/rainbowkit-siwe-next-auth";
import { alchemyProvider } from "wagmi/providers/alchemy";
import "@rainbow-me/rainbowkit/styles.css";
import React from "react";
import { Router } from "next/router";
import { LoopingRhombusesSpinner } from "react-epic-spinners";

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Sign in to Revenue based defi app",
});

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [alchemyProvider({apiKey:process.env.NEXT_PUBLIC_ALCHEMY_KEY})]
);

const { connectors } = getDefaultWallets({
  appName: "Revenue based defi",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("finished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <WagmiConfig client={wagmiClient}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <RainbowKitSiweNextAuthProvider
          getSiweMessageOptions={getSiweMessageOptions}
        >
          <RainbowKitProvider
            theme={lightTheme({ borderRadius: "medium", overlayBlur: "small" })}
            chains={chains}
          >
            <AppContainer>
            {loading ?  <div className="flex items-center justify-center gap-8 py-20">
        <LoopingRhombusesSpinner color="rgb(59,130,240)" />
      </div> : <Component {...pageProps} />}
            </AppContainer>
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
