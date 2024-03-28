import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Countdown from "./Partials/Countdown";

export default function Dashboard({ auth }: PageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="h-[80vh] w-screen flex items-center justify-center">
        <div className="text-center p-10">
          <Countdown />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
