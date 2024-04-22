import { FormEventHandler, useEffect } from "react";

import GuestLayout from "@/Layouts/GuestLayout";

import { Button } from "@/Components/ui/button";
import { toast } from "sonner";

import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }: { status?: string }) {
  const { post, processing } = useForm({});

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("verification.send"));
  };

  useEffect(() => {
    if (status === "verification-link-sent") {
      toast("Email envoyé", {
        description: "Un nouveau lien a été envoyé à votre adresse e-mail.",
      });
    }
  }, [status]);

  return (
    <GuestLayout>
      <Head title="Email Verification" />

      <div className="px-6 py-18 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Vérifiez votre adresse e-mail
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-2 text-gray-600">
            Merci d'avoir créer un compte! Avant de commencer, pourriez-vous
            vérifier votre adresse e-mail en cliquant sur le lien que nous
            venons de vous envoyer par e-mail?
          </p>
          <form onSubmit={submit} className="w-full flex justify-center">
            <div className="mt-10 flex items-center justify-between w-2/3">
              <Button disabled={processing}>Envoyer un nouveau lien</Button>

              <Link
                href={route("logout")}
                method="post"
                as="button"
                className="underline text-sm text-gray-600  hover:text-gray-900  rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Déconnexion
              </Link>
            </div>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
}
