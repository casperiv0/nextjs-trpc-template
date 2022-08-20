import { PageHeader } from "components/ui/page-header";
import Head from "next/head";
import { useUser } from "src/hooks/use-user";

export default function IndexPage() {
  const { user } = useUser();

  return (
    <>
      <Head>
        <title>Dashboard - tRPC/Next.js/Tailwind CSS Template</title>
      </Head>

      <PageHeader
        title="Dashboard"
        description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, molestias eum."
      />

      <p>
        You are currently logged in as <strong>{user?.email}</strong>
      </p>
    </>
  );
}
