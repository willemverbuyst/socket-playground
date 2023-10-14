import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooBar from "./FooBar";
import Grault from "./Grault";
import Lorem from "./Lorem";
import Quux from "./Quux";

export default function App() {
  function notify(value: string) {
    toast(value);
  }

  return (
    <main className="bg-slate-800 text-slate-100 p-4 h-screen flex flex-col gap-5">
      <h1 className="text-5xl text-center py-5">SocketIO</h1>
      <section className="flex justify-center gap-5">
        <FooBar notify={notify} />
        <Grault />
      </section>
      <section className="flex justify-center gap-5">
        <Quux />
        <Lorem notify={notify} />
      </section>
      <ToastContainer position="top-right" autoClose={2000} />
    </main>
  );
}
