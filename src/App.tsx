import type * as React from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-20">
      <Navbar />
      <Hero />
    </main>
  );
};

export default App;
