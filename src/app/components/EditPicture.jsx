"use client";

import { Avatar, Input } from "@nextui-org/react";
import React from "react";
import PreviewFile from "./PreveiwFile";

const EditPicture = ({ formik, inputName }) => {
  return (
    <div className="grid grid-cols-2 gap-x-3 justify-items-end pr-6">
      <Input
        name={inputName}
        type="file"
        color={formik.errors[inputName] ? "danger" : "default"}
        errorMessage={
          formik.touched[inputName] && formik.errors[inputName]
            ? formik.errors[inputName]
            : null
        }
        onChange={(event) => {
          formik.setFieldValue(inputName, event.currentTarget.files[0]);
        }}
      />
      {formik.values[inputName] ? (
        <PreviewFile file={formik.values[inputName]} />
      ) : (
        <Avatar
          showFallback
          src="https://images.unsplash.com/broken"
          className="w-20 h-20 text-large relative -top-3"
        />
      )}
    </div>
  );
};

export default EditPicture;
