"use client";

import { Avatar } from "@nextui-org/react";
import React from "react";
import PreviewFile from "./PreveiwFile";

const EditPicture = (props) => {
  return (
    <div className="grid grid-cols-2 gap-x-3 justify-items-end">
      <div className=" w-full flex items-center">
        <input
          id="image"
          name="imageURL"
          type="file"
          onChange={(event) => {
            props.formik.setFieldValue("imageURL", event.currentTarget.files[0]);
          }}
        />
      </div>
      {props.formik.values["imageURL"] ? (
        <PreviewFile file={props.formik.values["imageURL"]} formik={props.formik}/>
      ) : (
        <Avatar
          showFallback
          src="https://images.unsplash.com/broken"
          className="w-20 h-20 text-large"
        />
      )}
      {props.formik.touched["imageURL"] && props.formik.errors["imageURL"] ? (
        <div className=" w-full text-sm text-red-500">
          {props.formik.errors["imageURL"]}
        </div>
      ) : null}
    </div>
  );
};

export default EditPicture;
