import "react-toastify/dist/ReactToastify.css";
import DenoServer from "./components/DenoServer.tsx";
import NodeJSServer1 from "./components/NodeJSServer1.tsx";
import NodeJSServer2 from "./components/NodeJSServer2.tsx";
import NodeJSServer3 from "./components/NodeJSServer3.tsx";
import NodeJSServer4 from "./components/NodeJSServer4.tsx";
import PythonServer from "./components/PythonServer.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

export default function App() {
  return (
    <main className="w-screen min-h-screen p-20 flex flex-col items-center gap-20">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        SocketIO
      </h1>
      <section className="grid grid-cols-3 gap-10 mx-auto">
        <NodeJSServer1 />
        <PythonServer />
        <NodeJSServer3 />
        <NodeJSServer2 />
        <DenoServer />
        <NodeJSServer4 />
      </section>
      <Toaster />
    </main>
  );
}
