import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControlls } from "#components";
import { useWindowStore } from "#store/windows.js";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  // Return null if no data
  if (!data) {
    return null;
  }

  const { name, image, subtitle, description } = data;

  return (
    <>
      <div id="window-header">
        <WindowControlls target="txtfile" />
        <h2>{name || "Text File"}</h2>
      </div>

      <div className="txtfile-content">
        {image && (
          <div className="txtfile-image">
            <img src={image} alt={name} />
          </div>
        )}

        {subtitle && <h3 className="txtfile-subtitle">{subtitle}</h3>}

        {description &&
          Array.isArray(description) &&
          description.length > 0 && (
            <div className="txtfile-description">
              {description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
