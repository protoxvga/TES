import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import { Survey } from "@/types";
import { router } from "@inertiajs/react";

const IdeaVoteButtons = ({ openedSurvey }: { openedSurvey: Survey }) => {
  const isTupperware = openedSurvey?.votes.some(
    (vote) => vote.restaurant.name === "Tupperware"
  );

  return (
    <div className="w-full h-[30vh] flex justify-center items-center flex-col">
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-[200px] mt-6" variant="secondary">
                J'ai un tupperware
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Êtes-vous sûr de créer un vote ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible, vous ne pourrez pas annuler
                  votre vote.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    router.post(route("vote.create"), {
                      restaurant_id: 1,
                      meeting_time: "12:00",
                      location: "eat_in",
                    })
                  }
                >
                  Valider
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default IdeaVoteButtons;
