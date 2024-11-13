import LoginPage from "./components/LoginPage.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

export default function App() {
  return (
    <main className="w-screen min-h-screen p-20 flex flex-col items-center gap-20">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        SocketIO
      </h1>
      <LoginPage />
      <Toaster />
    </main>
  );
}
