import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { isAuth } from "server/middleware/is-auth";
import { t } from "server/trpc";
import { prisma } from "utils/prisma";

const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  email: true,
  imageUrl: true,
  name: true,
  createdAt: true,
  updatedAt: true,
});

export const userRouter = t.router({
  getSession: isAuth.query(async ({ ctx }) => {
    const dbUser = await prisma.user.findUnique({
      where: { email: ctx.dbUser!.email },
      select: defaultUserSelect,
    });

    return { session: ctx.session, user: dbUser };
  }),
  deleteUser: isAuth.mutation(async ({ ctx }) => {
    if (!ctx.session?.user?.email) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    await prisma.user.delete({
      where: { email: ctx.session.user.email },
    });

    return { deleted: true };
  }),
});
