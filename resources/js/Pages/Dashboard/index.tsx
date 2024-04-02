import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import Countdown from "./Partials/Countdown";
import Survey from "./Partials/Survey";

import { toast } from "sonner";
import { useEffect } from "react";

export default function Dashboard({ auth, surveys }: PageProps) {
  const { errors, success } = usePage().props;

  const openedSurvey = surveys.find((survey) => survey.is_open);

  useEffect(() => {
    if (errors.message) {
      toast(errors.message);
    } else if (success && typeof success === "string") {
      toast(success);
    }
  }, [errors, success]);

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Dashboard" />
      {openedSurvey ? <Survey openedSurvey={openedSurvey} /> : null}
      {!openedSurvey && <Countdown />}
    </AuthenticatedLayout>
  );
}
