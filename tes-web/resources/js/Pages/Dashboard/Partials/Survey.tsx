import Button from "@/Components/PrimaryButton";
import { Survey as SurveyType } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import VoteCard from "./components/VoteCard";

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
            Aucune proposition 😢
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 break-words">
            Une envie particulière ? Proposez-la !
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href={route("dashboard")}
              className="rounded-md bg-indigo-600 px-9 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              J'ai une idée !
            </a>
          </div>
        </div>
      ) : (
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-10"
        >
          {openedSurvey.votes.map((vote) => (
            <VoteCard key={vote.id} vote={vote} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Survey;
