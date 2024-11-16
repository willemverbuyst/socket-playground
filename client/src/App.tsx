import DashboardPage from "./components/DashboardPage.tsx";
import Header from "./components/Header.tsx";
import { Separator } from "./components/ui/separator.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

export default function App() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 min-h-screen">
        <Header />
        <Separator />
        <main className="overflow-auto">
          <DashboardPage />
        </main>
      </div>
      <Toaster />
    </div>
  );
}
