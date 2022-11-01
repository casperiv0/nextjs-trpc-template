import type { AppProps } from "next/app";
import { Layout } from "components/ui/layout";
import { SessionProvider } from "next-auth/react";

import "styles/globals.css";
import { useUser } from "hooks/use-user";
import { trpc } from "utils/trpc";

function App({ Component, pageProps }: AppProps) {
  const { session } = useUser();

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default trpc.withTRPC(App);
