import { Button } from "@/Components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/Components/ui/tooltip";
import { Location, User, Vote } from "@/types";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { router } from "@inertiajs/react";

interface Props {
  vote: Vote;
}

interface LocationTemplate {
  [key: string]: string;
}

const locationColorTemplate: LocationTemplate = {
  delivery: "bg-red-50 text-red-700 ring-red-600/20",
  takeway: "bg-blue-50 text-blue-700 ring-blue-600/20",
  eat_in: "bg-green-50 text-green-700 ring-green-600/20",
};

const locationTextTemplate: LocationTemplate = {
  delivery: "Livraison",
  takeway: "À emporter",
  eat_in: "Sur place",
};

const VoteCard = ({ vote }: Props) => {
  const location = locationTextTemplate[vote.location as Location];

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
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow relative"
    >
      <div className="flex w-full items-center justify-between space-x-6 px-6 py-4">
        <div className="flex-1 truncate w-48">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium text-gray-900">
              {vote.restaurant.name}
            </h3>
            <span
              className={`inline-flex flex-shrink-0 items-center rounded-lg px-2.5 py-1.5 text-xs font-medium ring-1 ring-inset absolute -top-2 -right-4 ${
                locationColorTemplate[vote.location]
              }`}
            >
              {location}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="truncate text-sm text-gray-500">{formattedTime}</p>
            <Tooltip>
              <TooltipTrigger className="flex justify-center items-center h-6 space-x-1">
                <div className="h-5">
                  <p className="truncate text-sm text-gray-500">
                    {vote.users.length + 1} participant(s)
                  </p>
                </div>
                <InformationCircleIcon className="h-4 w-4 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {vote!.creator!.firstname} {vote!.creator!.lastname}
                </p>
                {vote.users.map((user: User) => (
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
