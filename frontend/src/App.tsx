import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import NavBar from "./components/navbar";
import HomePage from "./pages/home-page";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="flex min-h-screen flex-col">
        <NavBar />
        <main className="flex-1 bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <footer className="border-t bg-white py-4 text-center text-sm text-gray-500">
          <div className="container mx-auto px-4">
            <p>Pokémon Manager - React TypeScript App</p>
          </div>
        </footer>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
