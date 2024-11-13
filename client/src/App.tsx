import "react-toastify/dist/ReactToastify.css";
import Corge from "./components/Corge.tsx";
import FooBar from "./components/FooBar.tsx";
import Grault from "./components/Grault.tsx";
import Quux from "./components/Quux.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

export default function App() {
  return (
    <main className="w-screen min-h-screen p-20 flex flex-col items-center gap-20">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        SocketIO
      </h1>
      <section className="grid grid-cols-2 gap-20 mx-auto">
        <FooBar />
        <Grault />
        <Quux />
        <Corge />
      </section>
      <Toaster />
    </main>
  );
}
