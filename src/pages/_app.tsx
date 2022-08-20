import * as React from "react";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import type { AppProps } from "next/app";
import superjson from "superjson";
import { Layout } from "components/ui/layout";
import type { AppRouter } from "server/routers/_app";
import { SessionProvider } from "next-auth/react";

import "styles/globals.css";
import { useUser } from "src/hooks/useUser";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { session } = useUser();

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

function getBaseUrl() {
  if (process.env.NODE_ENV === "production") {
    return process.env.NEXTAUTH_URL;
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    return {
      headers() {
        return {
          cookie: ctx?.req?.headers.cookie,
          ssr: "true",
        };
      },
      url: getBaseUrl(),
      fetch(url: RequestInfo | URL, options?: RequestInit | undefined) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      transformer: superjson,
    };
  },
  ssr: true,
})(MyApp);
