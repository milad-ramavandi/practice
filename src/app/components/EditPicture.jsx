import { Avatar, Input } from "@nextui-org/react";
import React from "react";

const EditPicture = ({ formik }) => {
  return (
    <div className="grid grid-cols-2 gap-x-3 justify-items-end pr-3">
      <Input
        type="file"
        {...formik.getFieldProps("imageURL")}
        color={formik.errors.imageURL ? "danger" : "default"}
        errorMessage={
          formik.touched.imageURL && formik.errors.imageURL ? (
            <span>{formik.errors.imageURL}</span>
          ) : null
        }
      />
       <Avatar showFallback src='https://images.unsplash.com/broken' className="w-20 h-20 relative -top-3"/>
    </div>
  );
};

export default EditPicture;
