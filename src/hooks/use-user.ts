import { trpc } from "utils/trpc";

export function useUser() {
  const { data, ...query } = trpc.user.getSession.useQuery();
  const user = data?.user;
  const session = data?.session;

  return { user, session, ...query };
}
