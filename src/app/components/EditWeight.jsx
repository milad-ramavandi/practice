import { Input, Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { dataWeight } from "../data/data";

const EditWeight = ({ formik }) => {
  return (
    <div className=" space-y-4">
      <h3 className=" text-center">Edit Weight</h3>
      <div className="flex gap-x-2">
        <Input
          type="text"
          {...formik.getFieldProps("baseWeight")}
          color={formik.errors.baseWeight ? "danger" : "default"}
          errorMessage={
            formik.touched.baseWeight && formik.errors.baseWeight ? (
              <span>{formik.errors.baseWeight}</span>
            ) : null
          }
          placeholder="70"
        />
        /
        <Input
          type="text"
          {...formik.getFieldProps("decimalWeight")}
          color={formik.errors.decimalWeight ? "danger" : "default"}
          errorMessage={
            formik.touched.decimalWeight && formik.errors.decimalWeight ? (
              <span>{formik.errors.decimalWeight}</span>
            ) : null
          }
          placeholder="0.8"
        />
        <Select
          items={dataWeight}
          {...formik.getFieldProps("unitWeight")}
          color={formik.errors.unitWeight ? "danger" : "default"}
          errorMessage={
            formik.touched.unitWeight && formik.errors.unitWeight ? (
              <span>{formik.errors.unitWeight}</span>
            ) : null
          }
          placeholder="kg"
        >
          {(item) => <SelectItem key={item.id}>{item.unit}</SelectItem>}
        </Select>
      </div>
    </div>
  );
};

export default EditWeight;
