import { Avatar } from "@nextui-org/react";
import React from "react";

const PreviewFile = ({ file }) => {
  const [preview, setPreview] = React.useState(null);

  const reader = new FileReader();

  reader.readAsDataURL(file);

  function isFileImage(file) {
    return file && file["type"].split("/")[0] === "image";
  }

  reader.onload = () => {
    setPreview(isFileImage(file) ? reader.result : "/default.svg");
  };

  return (
    <div>
      <Avatar
        src={preview}
        className="w-20 h-20 text-large relative -top-3"
      />
    </div>
  );
};

export default PreviewFile;
