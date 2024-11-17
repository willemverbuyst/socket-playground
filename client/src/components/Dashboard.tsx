import { Baz } from "./Baz.tsx";
import { Corge } from "./Corge.tsx";
import { FooBar } from "./FooBar.tsx";
import { Garply } from "./Garply.tsx";
import { Grault } from "./Grault.tsx";
import { Quux } from "./Quux.tsx";
import { Waldo } from "./Waldo.tsx";
import { Xyzzy } from "./Xyzzy.tsx";

export function Dashboard() {
  return (
    <div className="flex justify-center py-10">
      <section className="flex flex-wrap max-w-[1200px] items-stretch gap-5 px-4">
        <FooBar />
        <Grault />
        <Quux />
        <Baz />
        <Waldo />
        <Corge />
        <Xyzzy />
        <Garply />
      </section>
    </div>
  );
}
