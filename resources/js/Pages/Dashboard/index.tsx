import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import Countdown from "./Partials/Countdown";
import Survey from "./Partials/Survey";

import { toast } from "sonner";
import { useEffect } from "react";
import { Button } from "@/Components/ui/button";

export default function Dashboard({ auth, survey }: PageProps) {
  const { errors, success } = usePage().props;

  const openedSurvey = survey || undefined;
  const isTupperware = openedSurvey?.votes.some(
    (vote) => vote.restaurant.name === "Tupperware"
  );

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
        <div className="w-full h-[80vh] flex justify-center items-center flex-col">
          <p className="text-lg text-center leading-8 text-gray-600 break-words">
            Une petite faim ? Les votes sont ouverts !
          </p>
          <div className="flex gap-5 justify-center items-center">
            <Button
              className="w-[200px] mt-6"
              onClick={() => router.get(route("vote"))}
            >
              J'ai une idée
            </Button>
            {!isTupperware && (
              <Button
                className="w-[200px] mt-6"
                variant="secondary"
                onClick={() =>
                  router.post(route("vote.create"), {
                    restaurant_id: 1,
                    meeting_time: "12:00",
                    location: "eat_in",
                  })
                }
              >
                J'ai un tupperware
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Countdown />
      )}
    </AuthenticatedLayout>
  );
}
