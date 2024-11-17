import DenoServer from "./DenoServer.tsx";
import { Garply } from "./Garply.tsx";
import NodeJSServer1 from "./NodeJSServer1.tsx";
import NodeJSServer2 from "./NodeJSServer2.tsx";
import NodeJSServer3 from "./NodeJSServer3.tsx";
import NodeJSServer4 from "./NodeJSServer4.tsx";
import PythonServer from "./PythonServer.tsx";
import { Xyzzy } from "./Xyzzy.tsx";

export default function DashboardPage() {
  return (
    <div className="flex justify-center py-10">
      <section className="flex flex-wrap max-w-[1200px] items-stretch gap-5 px-4">
        <NodeJSServer1 />
        <PythonServer />
        <NodeJSServer2 />
        <NodeJSServer3 />
        <DenoServer />
        <NodeJSServer4 />
        <Xyzzy />
        <Garply />
      </section>
    </div>
  );
}
