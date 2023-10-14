import { PropsWithChildren } from "react";

export default function Wrapper<T>({ children }: PropsWithChildren<T>) {
  return (
    <section className="flex flex-col items-center pb-10 border border-slate-600 w-96">
      {children}
    </section>
  );
}
