import { useEffect, FormEventHandler } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Button } from "@/Components/ui/button";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  useEffect(() => {
    if (status === "Your password has been reset.") {
      toast("Mot de passe réinitialisé", {
        description:
          "Votre mot de passe a été réinitialisé. Vous pouvez maintenant vous connecter.",
      });
    }
  }, [status]);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("login"));
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      <form onSubmit={submit}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Se connecter
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <InputLabel htmlFor="email" value="Email" />

              <TextInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full"
                autoComplete="username"
                isFocused={true}
                onChange={(e) => setData("email", e.target.value)}
              />

              <InputError message={errors.email} className="mt-2" />
            </div>
            <div className="mt-8">
              <div>
                <div className="flex w-full items-center justify-between">
                  <InputLabel htmlFor="password" value="Mot de passe" />
                  {canResetPassword && (
                    <a
                      href={route("password.request")}
                      className="text-sm font-medium leading-6 text-orange-600 hover:text-orange-500"
                    >
                      Mot de passe oublié ?
                    </a>
                  )}
                </div>

                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  value={data.password}
                  className="mt-1 block w-full"
                  autoComplete="password"
                  isFocused={true}
                  onChange={(e) => setData("password", e.target.value)}
                />

                <InputError message={errors.password} className="mt-2" />
              </div>
            </div>
            <div className="block mt-8">
              <label className="flex items-center">
                <Checkbox
                  name="remember"
                  checked={data.remember}
                  onChange={(e) => setData("remember", e.target.checked)}
                />
                <span className="ms-2 text-sm text-gray-600">
                  Se souvenir de moi
                </span>
              </label>
            </div>

            <div className="mt-6">
              <Button
                className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                disabled={processing}
              >
                Connexion
              </Button>
              <p className="mt-10 text-center text-sm text-gray-500">
                Pas encore inscrit ?{" "}
                <a
                  href={`${route("register")}`}
                  className="font-semibold leading-6 text-orange-600 hover:text-orange-500"
                >
                  J'ai faim !
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </GuestLayout>
  );
}
