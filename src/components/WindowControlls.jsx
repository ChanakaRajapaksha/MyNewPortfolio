import { useWindowStore } from "#store/windows.js";

const WindowControlls = ({ target }) => {
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindowStore();

  return (
    <div id="window-controls">
      <div
        title="Close"
        className="close"
        onClick={() => closeWindow(target)}
      ></div>
      <div
        title="Minimize"
        className="minimize"
        onClick={() => minimizeWindow(target)}
      ></div>
      <div
        title="Maximize"
        className="maximize"
        onClick={() => maximizeWindow(target)}
      ></div>
    </div>
  );
};

export default WindowControlls;
