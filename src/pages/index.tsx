import { PageHeader } from "components/ui/page-header";
import Head from "next/head";
import { useUser } from "hooks/use-user";
import Link from "next/link";
import { buttonSizes, buttonVariants } from "components/ui/button";
import { classnames } from "utils/classnames";
import { ArrowRight } from "react-bootstrap-icons";

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

      <Link
        href="/settings"
        className={classnames(
          "flex items-center gap-2 w-fit mt-5 rounded-sm transition-all border-[1.5px] border-transparent group",
          buttonVariants.default,
          buttonSizes.sm,
        )}
      >
        Settings
        <ArrowRight className="group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </>
  );
}
