import FooBar from "./FooBar";
import Grault from "./Grault";
import Lorem from "./Lorem";
import Quux from "./Quux";

export default function App() {
  return (
    <main className="bg-slate-800 text-slate-100 p-4 h-screen flex flex-col align-center">
      <h1 className="text-5xl text-center py-10">SocketIO</h1>
      <FooBar />
      <Quux />
      <Grault />
      <Lorem />
    </main>
  );
}
