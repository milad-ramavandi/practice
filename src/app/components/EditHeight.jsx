import React from "react";
import { dataHeight } from "../data/data";
import { Input, Select, SelectItem } from "@nextui-org/react";

const EditHeight = ({ formik }) => {
  return (
    <div className=" space-y-4">
      <h3 className=" text-center">Edit Height</h3>
      <div className="flex gap-x-2">
        <Input
          type="text"
          {...formik.getFieldProps("baseHeight")}
          color={formik.errors.baseHeight ? "danger" : "default"}
          errorMessage={
            formik.touched.baseHeight && formik.errors.baseHeight ? (
              <span>{formik.errors.baseHeight}</span>
            ) : null
          }
        />
        /
        <Input
          type="text"
          {...formik.getFieldProps("decimalHeight")}
          color={formik.errors.decimalHeight ? "danger" : "default"}
          errorMessage={
            formik.touched.decimalHeight && formik.errors.decimalHeight ? (
              <span>{formik.errors.decimalHeight}</span>
            ) : null
          }
        />
        <Select
          items={dataHeight}
          {...formik.getFieldProps("unitHeight")}
          color={formik.errors.unitHeight ? "danger" : "default"}
          errorMessage={
            formik.touched.unitHeight && formik.errors.unitHeight ? (
              <span>{formik.errors.unitHeight}</span>
            ) : null
          }
        >
          {(item) => <SelectItem key={item.id}>{item.unit}</SelectItem>}
        </Select>
      </div>
    </div>
  );
};

export default EditHeight;
