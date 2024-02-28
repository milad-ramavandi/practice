import React from "react";
import { dataHeight } from "../data/data";
import { Input, Select, SelectItem } from "@nextui-org/react";

const EditHeight = (props) => {
  return (
    <div className=" space-y-4">
      <h3 className=" text-center">Edit Height</h3>
      <div className="flex gap-x-2">
        <Input
          type="text"
          {...props.formik.getFieldProps("baseHeight")}
          color={props.formik.errors.baseHeight ? "danger" : "default"}
          errorMessage={
            props.formik.touched.baseHeight && props.formik.errors.baseHeight ? (
              <span>{props.formik.errors.baseHeight}</span>
            ) : null
          }
          placeholder="160"
        />
        /
        <Input
          type="text"
          {...props.formik.getFieldProps("decimalHeight")}
          color={props.formik.errors.decimalHeight ? "danger" : "default"}
          errorMessage={
            props.formik.touched.decimalHeight && props.formik.errors.decimalHeight ? (
              <span>{props.formik.errors.decimalHeight}</span>
            ) : null
          }
          placeholder="0.77"
        />
        <Select
          items={dataHeight}
          {...props.formik.getFieldProps("unitHeight")}
          color={props.formik.errors.unitHeight ? "danger" : "default"}
          errorMessage={
            props.formik.touched.unitHeight && props.formik.errors.unitHeight ? (
              <span>{props.formik.errors.unitHeight}</span>
            ) : null
          }
          placeholder="cm"
        >
          {(item) => <SelectItem key={item.id}>{item.unit}</SelectItem>}
        </Select>
      </div>
    </div>
  );
};

export default EditHeight;
