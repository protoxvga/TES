import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import Countdown from "./Partials/Countdown";
import Survey from "./Partials/Survey";

import { toast } from "sonner";
import { useEffect } from "react";
import IdeaVoteButtons from "./Partials/IdeaVoteButtons";

export default function Dashboard({ auth, survey }: PageProps) {
  const { errors, success } = usePage().props;

  const openedSurvey = survey || undefined;

  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const currentHour = currentDate.getHours();

  useEffect(() => {
    if (errors.message) {
      toast(errors.message);
    } else if (success && typeof success === "string") {
      toast(success);
    }
  }, [errors, success]);

  const isSurveyOpen = () => {
    if (currentDayOfWeek >= 1 && currentDayOfWeek <= 5) {
      if ([9, 10, 11, 12].includes(currentHour)) return true;
    }
    return false;
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Dashboard" />
      {isSurveyOpen() && openedSurvey ? (
        <Survey openedSurvey={openedSurvey} />
      ) : isSurveyOpen() ? (
        <IdeaVoteButtons openedSurvey={openedSurvey} />
      ) : (
        <Countdown />
      )}
    </AuthenticatedLayout>
  );
}
