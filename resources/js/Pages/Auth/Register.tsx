import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Button } from "@/Components/ui/button";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("register"));
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <div className="flex flex-col items-center w-full">
        <div className="">
          {/* <ApplicationLogo /> */}
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Créer un compte
          </h2>
        </div>

        <form onSubmit={submit} className="mt-10 w-[450px]">
          <div className="flex w-full justify-between space-x-4">
            <div className="w-full">
              <InputLabel htmlFor="firstname" value="Prénom" />

              <TextInput
                id="firstname"
                name="firstname"
                value={data.firstname}
                className="mt-1 block w-full"
                autoComplete="name"
                isFocused={true}
                onChange={(e) => setData("firstname", e.target.value)}
                required
              />

              <InputError message={errors.firstname} className="mt-2" />
            </div>
            <div className="w-full">
              <InputLabel htmlFor="lastname" value="Nom" />

              <TextInput
                id="lastname"
                name="lastname"
                value={data.lastname}
                className="mt-1 block w-full"
                autoComplete="name"
                isFocused={true}
                onChange={(e) => setData("lastname", e.target.value)}
                required
              />

              <InputError message={errors.lastname} className="mt-2" />
            </div>
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="email" value="Email" />

            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              className="mt-1 block w-full"
              autoComplete="username"
              onChange={(e) => setData("email", e.target.value)}
              required
            />

            <InputError message={errors.email} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="password" value="Mot de passe" />

            <TextInput
              id="password"
              type="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full"
              autoComplete="new-password"
              onChange={(e) => setData("password", e.target.value)}
              required
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel
              htmlFor="password_confirmation"
              value="Confirmer le mot de passe"
            />

            <TextInput
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={data.password_confirmation}
              className="mt-1 block w-full"
              autoComplete="new-password"
              onChange={(e) => setData("password_confirmation", e.target.value)}
              required
            />

            <InputError
              message={errors.password_confirmation}
              className="mt-2"
            />
          </div>

          <div className="mt-8">
            <Button
              className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              disabled={processing}
            >
              Créer un compte
            </Button>
            <p className="mt-4 text-center text-sm text-gray-500">
              Déjà inscrit ?{" "}
              <a
                href={`${route("login")}`}
                className="font-semibold leading-6 text-orange-600 hover:text-orange-500"
              >
                Se connecter !
              </a>
            </p>
          </div>
        </form>
      </div>
    </GuestLayout>
  );
}
