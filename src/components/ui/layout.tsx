import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import { useUser } from "hooks/use-user";
import { Loader } from "./loader";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const sessionQuery = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (!sessionQuery.user && !sessionQuery.isLoading && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [sessionQuery, router]);

  if ((sessionQuery.isLoading || !sessionQuery.user) && router.pathname !== "/login") {
    return <Loader fixed />;
  }

  return (
    <>
      <Head>
        <title>Earnings Tracker</title>

        <link rel="preload" href="/fonts/Raleway-VF.ttf" as="font" type="font/ttf" crossOrigin="" />
        <link
          rel="preload"
          href="/fonts/RobotoSlab-VF.ttf"
          as="font"
          type="font/ttf"
          crossOrigin=""
        />
        <meta name="description" content="A simple and good looking income/expenses tracker." />
      </Head>

      <div className="md:flex">
        <main className="p-3 py-5 md:p-10 mx-auto max-w-6xl w-full">{children}</main>
      </div>
    </>
  );
}
