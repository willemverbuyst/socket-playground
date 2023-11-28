import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooBar from "./components/FooBar";
import Grault from "./components/Grault";
import Quux from "./components/Quux";

export default function App() {
  return (
    <main className="bg-slate-800 text-slate-100 p-4 h-screen flex flex-col gap-5">
      <h1 className="text-5xl text-center py-5">SocketIO</h1>
      <section className="flex flex-col justify-center items-center gap-5">
        <FooBar />
        <Grault />
        <Quux />
      </section>
      <ToastContainer position="bottom-left" autoClose={2000} />
    </main>
  );
}
