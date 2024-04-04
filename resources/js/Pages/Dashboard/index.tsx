import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import Countdown from "./Partials/Countdown";
import Survey from "./Partials/Survey";

import { toast } from "sonner";
import { useEffect } from "react";
import { Button } from "@/Components/ui/button";

export default function Dashboard({ auth, surveys }: PageProps) {
  const { errors, success } = usePage().props;

  const openedSurvey = surveys[0] || undefined;

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
      if (currentHour === 10 || currentHour === 11 || currentHour === 12)
        return true;
    }
    return false;
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Dashboard" />
      {isSurveyOpen() && openedSurvey ? (
        <Survey openedSurvey={openedSurvey} />
      ) : isSurveyOpen() ? (
        <div className="w-full h-[80vh] flex justify-center items-center flex-col">
          <p className="text-lg text-center leading-8 text-gray-600 break-words">
            Une petite faim ? Les votes sont ouverts !
          </p>
          <Button
            className="w-[200px] mt-6"
            onClick={() => router.get(route("vote"))}
          >
            J'ai une idée
          </Button>
        </div>
      ) : (
        <>
          <Countdown />
        </>
      )}
    </AuthenticatedLayout>
  );
}
