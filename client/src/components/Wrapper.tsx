import { PropsWithChildren } from "react";

export default function Wrapper<T>({ children }: PropsWithChildren<T>) {
  return (
    <section className="flex flex-col items-center pb-10 w-96 relative">
      {children}
    </section>
  );
}
