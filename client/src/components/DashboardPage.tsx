import DenoServer from "./DenoServer.tsx";
import NodeJSServer1 from "./NodeJSServer1.tsx";
import NodeJSServer2 from "./NodeJSServer2.tsx";
import NodeJSServer3 from "./NodeJSServer3.tsx";
import NodeJSServer4 from "./NodeJSServer4.tsx";
import PythonServer from "./PythonServer.tsx";

export default function DashboardPage() {
  return (
    <div className="flex justify-center py-10">
      <section className="grid grid-cols-3 gap-10">
        <NodeJSServer1 />
        <PythonServer />
        <NodeJSServer3 />
        <NodeJSServer2 />
        <DenoServer />
        <NodeJSServer4 />
      </section>
    </div>
  );
}
