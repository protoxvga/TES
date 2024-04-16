import { Survey as SurveyType, Vote } from "@/types/models";
import VoteCard from "./components/VoteCard";
import { router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

interface Props {
  openedSurvey: SurveyType;
}

const Survey = ({ openedSurvey }: Props) => {
  return (
    <div
      className={`flex items-center justify-center p-10 w-full ${
        openedSurvey.votes.length === 0 && "h-[80vh]"
      }`}
    >
      {openedSurvey.votes.length === 0 ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Aucune proposition
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 break-words">
            Une envie particulière ? Proposez-la !
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href={route("vote")}
              className="rounded-md bg-orange-600 px-9 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              J'ai une idée !
            </a>
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-6 w-full items-center">
          <ul
            role="list"
            className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-10"
          >
            {openedSurvey.votes.map((vote: Vote) => (
              <VoteCard key={vote.id} vote={vote} />
            ))}
          </ul>
          <p className="mt-6 text-md text-center leading-8 text-gray-600 break-words">
            Vous ne trouvez pas votre bonheur ? Proposez une nouvelle idée !
          </p>
          <Button
            className="w-[200px] -mt-6"
            onClick={() => router.get(route("vote", openedSurvey.id))}
          >
            J'ai une autre idée
          </Button>
        </div>
      )}
    </div>
  );
};

export default Survey;
