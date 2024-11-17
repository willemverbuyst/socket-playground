import { Dashboard } from "./components/Dashboard.tsx";
import { Header } from "./components/Header.tsx";
import { Separator } from "./components/ui/separator.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

export function App() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 min-h-screen">
        <Header />
        <Separator />
        <main className="overflow-auto">
          <Dashboard />
        </main>
      </div>
      <Toaster />
    </div>
  );
}
