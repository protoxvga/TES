import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";
import { toast } from "sonner";

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("password.email"));
  };

  useEffect(() => {
    if (status === "passwords.sent") {
      toast("Email envoyé", {
        description:
          "Un lien de réinitialisation de mot de passe a été envoyé à votre adresse e-mail.",
      });
    }
  }, [status]);

  return (
    <GuestLayout>
      <Head title="Forgot Password" />
      <div className="flex justify-center">
        <div className="px-4 sm:p-6 w-[500px]">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Réinitialiser le mot de passe
          </h3>
          <div className="mt-2 max-w-3xl text-sm text-gray-500">
            <p>
              Entrez votre adresse e-mail et nous vous enverrons un lien pour
              réinitialiser votre mot de passe.
            </p>
          </div>
          <form onSubmit={submit} className="mt-5 sm:flex sm:items-start gap-4">
            <div className="w-full sm:max-w-xs">
              <TextInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="block w-full"
                isFocused={true}
                onChange={(e) => setData("email", e.target.value)}
              />

              <InputError message={errors.email} className="mt-2" />
            </div>
            <Button className="mt-4 sm:mt-0 block" disabled={processing}>
              Réinitialiser
            </Button>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
}
