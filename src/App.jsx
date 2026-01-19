import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

import { Navbar, Welcome, Dock, ClockWidget, Home } from "#components";
import {
  Terminal,
  Safari,
  Resume,
  Finder,
  Text,
  Image,
  Contact,
} from "#windows/index.js";

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
      <Text />
      <Image />
      <Contact />

      <Home />
    </main>
  );
};

export default App;
