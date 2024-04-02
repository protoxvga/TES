import { Button } from "@/Components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Components/ui/tooltip";
import { Vote } from "@/types";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { router } from "@inertiajs/react";

interface Props {
  vote: Vote;
}

const typeTemplate: TypeTemplate = {
  fast_food: "Fast food",
  restaurant: "Restaurant",
  pub: "Pub",
  bar: "Bar",
  cafe: "Café",
};

interface TypeTemplate {
  [key: string]: string;
}

const VoteCard = ({ vote }: Props) => {
  const type = vote.restaurant.type && typeTemplate[vote.restaurant.type];

  const join = () => {
    router.post(route("vote.join", vote.id));
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").slice(0, 2);
    return `${hours}:${minutes}`;
  };

  const formattedTime = formatTime(vote.meeting_time);

  return (
    <li
      key={vote.id}
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate w-48">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium text-gray-900">
              {vote.restaurant.name}
            </h3>
            <span className="inline-flex flex-shrink-0 items-center rounded-lg bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              {type}
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-gray-500">{formattedTime}</p>
          <Tooltip>
            <TooltipTrigger className="flex justify-center items-center h-6 space-x-1">
              <div className="h-5">
                <p className="truncate text-sm text-gray-500">
                  {vote.users.length + 1} participants
                </p>
              </div>
              <InformationCircleIcon className="h-4 w-4 text-gray-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {vote!.creator!.firstname} {vote!.creator!.lastname}
              </p>
              {vote.users.map((user) => (
                <div key={user.id} className="flex items-center space-x-2">
                  <p>
                    {user.firstname} {user.lastname}
                  </p>
                </div>
              ))}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="flex w-full justify-center p-2">
        <Button className="h-8 w-full" onClick={() => join()}>
          Rejoindre
        </Button>
      </div>
    </li>
  );
};

export default VoteCard;
