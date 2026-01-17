import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControlls } from "#components";
import { useWindowStore } from "#store/windows.js";

const Image = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;

  // Return null if no data
  if (!data) {
    return null;
  }

  const { title, imageUrl } = data;

  return (
    <>
      <div id="window-header">
        <WindowControlls target="imgfile" />
        <p>{title || "Image File"}</p>
      </div>

      <div className="preview">
        {imageUrl && <img src={imageUrl} alt={title || "Image"} />}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, "imgfile");

export default ImageWindow;
