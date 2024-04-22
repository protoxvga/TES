import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-2 sm:pt-0">
      <div className="w-full mt-6 px-6 py-4">{children}</div>
    </div>
  );
}
