import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Button from "@/Components/PrimaryButton";
import RestaurantsCombobox from "./Partials/RestaurantsCombobox";

export default function Vote({ auth, restaurants }: PageProps) {
  return restaurants ? (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800  leading-tight">
          Vote
        </h2>
      }
    >
      <Head title="Dashboard" />
      <div className="p-10 flex justify-center items-center flex-col w-full">
        <h1 className="text-2xl font-semibold text-gray-800">
          Créer une proposition
        </h1>
        <form>
          <RestaurantsCombobox restaurants={restaurants} />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </AuthenticatedLayout>
  ) : (
    <></>
  );
}
