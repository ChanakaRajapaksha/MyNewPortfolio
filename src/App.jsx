import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

import { Navbar, Welcome, Dock } from "#components";
import { Terminal, Safari, Resume } from "#windows/index.js";

import ClockWidget from "#components/ClockWidget.jsx";

const App = () => {
  return (
    <main>
      <Navbar />
      <ClockWidget />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
    </main>
  );
};

export default App;
