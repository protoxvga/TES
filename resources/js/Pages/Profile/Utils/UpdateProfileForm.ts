import { router } from "@inertiajs/react";
import { z } from "zod";

export const FormSchema = z.object({
  firstname: z.string().min(1, "Votre prénom est invalide."),
  lastname: z.string().min(1, "Votre nom est invalide."),
  email: z.string().min(1, "Votre adresse e-mail est invalide."),
});

export const onSubmit = (data: z.infer<typeof FormSchema>) => {
  try {
    router.patch(route("profile.update"), {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
    });
  } catch (error) {
    console.error("Form submission error:", error);
  }
};
