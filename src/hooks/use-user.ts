import { trpc } from "utils/trpc";

export function useUser() {
  const { data, ...query } = trpc.useQuery(["user.getSession"]);
  const user = data?.user;
  const session = data?.session;

  return { user, session, ...query };
}
