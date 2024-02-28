import { Input, Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { dataWeight } from "../data/data";

const EditWeight = (props) => {
  return (
    <div className=" space-y-4">
      <h3 className=" text-center">Edit Weight</h3>
      <div className="flex gap-x-2">
        <Input
          type="text"
          {...props.formik.getFieldProps("baseWeight")}
          color={props.formik.errors.baseWeight ? "danger" : "default"}
          errorMessage={
            props.formik.touched.baseWeight && props.formik.errors.baseWeight ? (
              <span>{props.formik.errors.baseWeight}</span>
            ) : null
          }
          placeholder="70"
        />
        /
        <Input
          type="text"
          {...props.formik.getFieldProps("decimalWeight")}
          color={props.formik.errors.decimalWeight ? "danger" : "default"}
          errorMessage={
            props.formik.touched.decimalWeight && props.formik.errors.decimalWeight ? (
              <span>{props.formik.errors.decimalWeight}</span>
            ) : null
          }
          placeholder="0.8"
        />
        <Select
          items={dataWeight}
          {...props.formik.getFieldProps("unitWeight")}
          color={props.formik.errors.unitWeight ? "danger" : "default"}
          errorMessage={
            props.formik.touched.unitWeight && props.formik.errors.unitWeight ? (
              <span>{props.formik.errors.unitWeight}</span>
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
