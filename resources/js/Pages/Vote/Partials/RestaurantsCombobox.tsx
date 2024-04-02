import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/Components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { Restaurant } from "@/types";
import { ArrowsUpDownIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const RestaurantsCombobox = ({
  restaurants,
  value,
  form,
}: {
  restaurants: Restaurant[];
  value: { restaurantName: string; restaurantId: number };
  form: any;
}) => {
  const [open, setOpen] = useState(false);

  return (
    restaurants && (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[300px] justify-between"
          >
            {value.restaurantName ? (
              <span className="truncate">{value.restaurantName}</span>
            ) : (
              <p className="text-gray-500">Choisissez un restaurant...</p>
            )}
            <ArrowsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 overflow-y-auto max-h-[15rem]">
          <Command>
            <CommandInput />
            <CommandEmpty>No restaurant found.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {restaurants
                  .filter((restaurant) => restaurant.name)
                  .map((restaurant) => (
                    <CommandItem
                      key={restaurant.id}
                      value={restaurant.name}
                      onSelect={(currentValue) => {
                        setOpen(false);
                        const selectedRestaurant = restaurants.find(
                          (r) => r.name === currentValue
                        );
                        form.setValue("restaurant", {
                          restaurantId: selectedRestaurant?.id,
                          restaurantName: selectedRestaurant?.name,
                        });
                      }}
                    >
                      <span className="truncate">{restaurant.name}</span>
                      <CheckCircleIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value.restaurantId === restaurant.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    )
  );
};

export default RestaurantsCombobox;
