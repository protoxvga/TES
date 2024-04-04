import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Toaster } from "./Components/ui/sonner";
import { TooltipProvider } from "./Components/ui/tooltip";

const appName = import.meta.env.APP_NAME;

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob("./Pages/**/*.tsx")
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <>
        <TooltipProvider>
          <App {...props} />
          <Toaster />
        </TooltipProvider>
      </>
    );
  },
  progress: {
    color: "#4B5563",
  },
});
