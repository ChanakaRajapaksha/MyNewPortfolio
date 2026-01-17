import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

import { Navbar, Welcome, Dock } from "#components";
import { Terminal, Safari, Resume, Finder } from "#windows/index.js";

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
      <Finder />
    </main>
  );
};

export default App;
