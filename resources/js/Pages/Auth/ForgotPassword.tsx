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

      <div className="mb-4 text-sm text-gray-600">
        Mot de passe oublié? Pas de problème. Entrez votre adresse e-mail et
        nous vous enverrons un lien de réinitialisation de mot de passe
      </div>

      <form onSubmit={submit}>
        <TextInput
          id="email"
          type="email"
          name="email"
          value={data.email}
          className="mt-1 block w-full"
          isFocused={true}
          onChange={(e) => setData("email", e.target.value)}
        />

        <InputError message={errors.email} className="mt-2" />

        <div className="flex items-center justify-end mt-4">
          <Button className="ms-4" disabled={processing}>
            Envoyer le lien de réinitialisation
          </Button>
        </div>
      </form>
    </GuestLayout>
  );
}
