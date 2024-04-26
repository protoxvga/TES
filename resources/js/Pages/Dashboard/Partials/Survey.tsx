import { Survey as SurveyType, Vote } from "@/types";
import VoteCard from "./components/VoteCard";
import IdeaVoteButtons from "./IdeaVoteButtons";

interface Props {
  openedSurvey: SurveyType;
  canVote: boolean;
}

const Survey = ({ openedSurvey, canVote }: Props) => {
  return (
    <div
      className={`flex items-center justify-center p-10 w-full ${
        openedSurvey.votes.length === 0 && "h-[80vh]"
      }`}
    >
      <div className="flex flex-col space-y-6 w-full items-center">
        <ul
          role="list"
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-10"
        >
          {openedSurvey.votes.map((vote: Vote) => (
            <VoteCard key={vote.id} vote={vote} canVote={canVote} />
          ))}
        </ul>
        {canVote && <IdeaVoteButtons openedSurvey={openedSurvey} />}
      </div>
    </div>
  );
};

export default Survey;
