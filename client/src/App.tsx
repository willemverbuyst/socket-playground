import "./App.css";
import FooBar from "./FooBar";
import Grault from "./Grault";
import Quux from "./Quux";

export default function App() {
  return (
    <div className="App">
      <h1>Hello SocketIO</h1>
      <section>
        <FooBar />
        <Quux />
        <Grault />
      </section>
    </div>
  );
}
