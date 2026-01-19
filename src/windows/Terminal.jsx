import { useState, useEffect } from "react";
import { techStack } from "#constants/index.js";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { Check, Clock } from "lucide-react";
import WindowControlls from "#components/WindowControlls.jsx";
import { useWindowStore } from "#store/windows.js";

const Terminal = () => {
  const { windows } = useWindowStore();
  const { isOpen } = windows.terminal;
  const [renderTime, setRenderTime] = useState(6);

  useEffect(() => {
    if (isOpen) {
      // Generate a random render time between 3ms and 15ms
      const randomTime = Math.floor(Math.random() * (15 - 3 + 1)) + 3;
      setRenderTime(randomTime);
    }
  }, [isOpen]);

  return (
    <>
      <div id="window-header">
        <WindowControlls target="terminal" />
        <h2>Tech Stack</h2>
      </div>

      <div className="techstack">
        <p>
          <span className="font-bold">@chanaka % </span>
          show tech stack
        </p>

        <div className="label">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>

        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li key={category} className="flex items-center">
              <Check className="check" size={20} />
              <h3>{category}</h3>
              <ul>
                {items.map((item, i) => (
                  <li key={i}>
                    {item}
                    {i < items.length - 1 ? "," : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="footnote">
          <p>
            <Check size={20} /> 6 of 6 stacks loaded successfully (100%)
          </p>

          <p className="text-black">
            <Clock size={15} />
            Render time: {renderTime}ms
          </p>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
