import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 min-w-0">

        <Navbar />

        <main>
          <Dashboard />
        </main>

      </div>

    </div>
  );
}

export default App;