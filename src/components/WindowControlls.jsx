import { useWindowStore } from "#store/windows.js";
import { X, Minus, Maximize } from "lucide-react";

const WindowControlls = ({ target }) => {
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindowStore();

  return (
    <div id="window-controls">
      <div className="close" onClick={() => closeWindow(target)}>
        <X size={10} className="control-icon" />
      </div>
      <div className="minimize" onClick={() => minimizeWindow(target)}>
        <Minus size={10} className="control-icon" />
      </div>
      <div className="maximize" onClick={() => maximizeWindow(target)}>
        <Maximize size={8} className="control-icon" />
      </div>
    </div>
  );
};

export default WindowControlls;
