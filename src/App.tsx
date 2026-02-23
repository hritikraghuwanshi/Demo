import type * as React from "react";
import Hero from "./components/Hero";

const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Hero />
    </main>
  );
};

export default App;
