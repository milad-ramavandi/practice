import { Avatar } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const PreviewFile = (props) => {
  const [preview, setPreview] = useState(null);

  const clickDeleteProfileHandler = () => {
    setPreview(null);
    document.getElementById('image').value = '';
    props.formik.values.imageURL = '';
  };

  useEffect(() => {
    const reader = new FileReader();

    reader.readAsDataURL(props.file);

    function isFileImage(file) {
      return file && file["type"].split("/")[0] === "image";
    }

    reader.onload = () => {
      setPreview(isFileImage(props.file) ? reader.result : "/default.svg");
    };
    ()=> reader.removeEventListener('load', ()=> setPreview(null))
  }, [props.file]);

  return (
    <div className=" flex flex-col gap-y-0">
      {preview ? (
        <>
          <button onClick={clickDeleteProfileHandler} className=" relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 absolute -top-[10px]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
          <Avatar src={preview} className="w-20 h-20 text-large" />
        </>
      ) : (
        <Avatar
          showFallback
          src="https://images.unsplash.com/broken"
          className="w-20 h-20 text-large"
        />
      )}
    </div>
  );
};

export default PreviewFile;
