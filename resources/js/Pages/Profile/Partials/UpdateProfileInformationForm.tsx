import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

import { Link, usePage } from "@inertiajs/react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { FormSchema, onSubmit } from "../Utils/UpdateProfileForm";
import { zodResolver } from "@hookform/resolvers/zod";

import { PageProps } from "@/types";

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = "",
}: {
  mustVerifyEmail: boolean;
  status?: string;
  className?: string;
}) {
  const user = usePage<PageProps>().props.auth.user;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    },
  });

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Informations</h2>

        <p className="mt-1 text-sm text-gray-600">
          Mettez à jour les informations de votre profil et l'adresse e-mail de
          votre compte.
        </p>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <div className="flex items-center space-x-4">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="Prénom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {mustVerifyEmail && user.email_verified_at === null && (
            <div>
              <p className="text-sm mt-2 text-gray-800">
                Your email address is unverified.
                <Link
                  href={route("verification.send")}
                  method="post"
                  as="button"
                  className="underline text-sm text-gray-600  hover:text-gray-900  rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Click here to re-send the verification email.
                </Link>
              </p>

              {status === "verification-link-sent" && (
                <div className="mt-2 font-medium text-sm text-green-600">
                  A new verification link has been sent to your email address."
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-4">
            <Button type="submit" disabled={form.formState.isLoading}>
              Sauvegarder
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
