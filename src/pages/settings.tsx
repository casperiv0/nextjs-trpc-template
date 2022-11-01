import { Button } from "components/ui/button";
import { FormField } from "components/form/form-field";
import { Input } from "components/form/input";
import { trpc } from "utils/trpc";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { PageHeader } from "components/ui/page-header";
import { useUser } from "hooks/use-user";

export default function SettingsPage() {
  const { user } = useUser();
  const deleteUserMutation = trpc.user.deleteUser.useMutation();

  function handleLogout() {
    signOut({ callbackUrl: "/login" });
  }

  async function handleDeleteUser() {
    if (confirm("Are you sure you want to delete your account?")) {
      await deleteUserMutation.mutateAsync();
      handleLogout();
    }
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <PageHeader
        title="Settings"
        description="View your account settings. This information is managed by GitHub."
      />

      <section id="account-info">
        <header>
          <h2 className="font-serif text-2xl font-semibold">Account Info</h2>
        </header>

        <div className="flex-shrink-0 h-20 w-20 my-7">
          <Image
            draggable={false}
            className="h-20 w-20 rounded-full"
            src={user.imageUrl!}
            alt={user.email}
            width={80}
            height={80}
            loading="lazy"
          />
        </div>

        <FormField label="Email">
          {({ labelId }) => <Input disabled id={labelId} name="email" defaultValue={user.email} />}
        </FormField>

        <FormField label="Name">
          {({ labelId }) => <Input disabled id={labelId} name="name" defaultValue={user.name} />}
        </FormField>
      </section>

      <section className="mt-5" id="danger">
        <header className="mb-5">
          <h2 className="font-serif text-2xl font-semibold">Danger Zone</h2>
        </header>

        <div className="flex gap-2">
          <Button onClick={handleDeleteUser} variant="danger" className="font-medium">
            Delete Account
          </Button>

          <Button onClick={handleLogout} variant="danger" className="font-medium">
            Logout
          </Button>
        </div>
      </section>
    </>
  );
}
