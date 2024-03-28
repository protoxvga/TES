import { useEffect, FormEventHandler } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

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

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("login"));
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
      )}

      <form onSubmit={submit}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
            {/* <ApplicationLogo /> */}
            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
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
                  <div className="text-sm">
                    {canResetPassword && (
                      <Link
                        href={route("password.request")}
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Mot de passe oublié ?
                      </Link>
                    )}
                  </div>
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
                <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                  Se souvenir de moi
                </span>
              </label>
            </div>

            <div className="mt-6">
              <PrimaryButton
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={processing}
              >
                Connexion
              </PrimaryButton>
              <p className="mt-10 text-center text-sm text-gray-500">
                Pas encore inscrit ?{" "}
                <a
                  href={`${route("register")}`}
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
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
