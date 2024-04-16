import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { VotePageProps } from "@/types";
import Button from "@/Components/PrimaryButton";
import RestaurantsCombobox from "./Partials/RestaurantsCombobox";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { router } from "@inertiajs/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { useEffect } from "react";

const hours = [
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
];

const FormSchema = z.object({
  restaurant: z.object({
    restaurantName: z
      .string()
      .min(1, "Vous devez sélectionner une heure de départ."),
    restaurantId: z.number(),
  }),
  meetingTime: z
    .string()
    .min(1, "Vous devez sélectionner une heure de départ."),
  location: z.string().min(1, "Vous devez entrer un lieu."),
});

export default function Vote({ auth, restaurants }: VotePageProps) {
  const { errors } = usePage().props;

  useEffect(() => {
    if (errors.message) {
      toast(errors.message);
    }
  }, [errors]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      restaurant: { restaurantName: "", restaurantId: 0 },
      meetingTime: "",
      location: "eat_in",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      router.post(route("vote.create"), {
        restaurant_id: data.restaurant.restaurantId,
        meeting_time: data.meetingTime,
        location: data.location,
      });
    } catch (error) {
      console.error("Form submission error:", error);
    }
  }

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Vote" />
      <div className="flex flex-col w-full items-center p-10">
        <h1 className="text-2xl font-semibold text-gray-800">
          Créer une proposition
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-20 mt-10 flex flex-col"
          >
            <div className="flex flex-col justify-between mt-10 lg:flex-row gap-10">
              <FormField
                control={form.control}
                name="restaurant"
                render={({ field }) => (
                  <FormItem className="flex flex-col h-30 justify-center">
                    <FormLabel>Restaurant</FormLabel>
                    <FormControl>
                      <RestaurantsCombobox
                        restaurants={restaurants}
                        value={field.value}
                        form={form}
                      />
                    </FormControl>
                    {form.formState.errors.restaurant ? (
                      <FormMessage />
                    ) : (
                      <FormDescription>
                        Où souhaitez-vous manger ?
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="meetingTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col h-30 justify-center">
                    <FormLabel>Heure de départ</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[300px]">
                          {field.value ? (
                            <SelectValue />
                          ) : (
                            <p className="text-gray-500">
                              Choisissez une heure...
                            </p>
                          )}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="overflow-y-auto max-h-[15rem]">
                        {hours.map((hour) => (
                          <SelectItem key={hour} value={hour}>
                            {hour}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.meetingTime ? (
                      <FormMessage />
                    ) : (
                      <FormDescription>
                        À quelle heure souhaitez-vous partir ?
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="flex flex-col h-30 justify-center">
                    <FormLabel>Lieu de restauration</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[300px]">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="eat_in">Sur place</SelectItem>
                        <SelectItem value="takeway">À emporter</SelectItem>
                        <SelectItem value="delivery">Livraison</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.meetingTime ? (
                      <FormMessage />
                    ) : (
                      <FormDescription>
                        Où souhaitez-vous manger ?
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full justify-center flex">
              <Button
                className="w-40 items-center justify-center"
                type="submit"
              >
                Créer
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AuthenticatedLayout>
  );
}
