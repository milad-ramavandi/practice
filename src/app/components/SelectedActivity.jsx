import { Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { dataActivity } from "../data/data";

const SelectedActivity = (props) => {
  return (
    <div className=" space-y-4">
      <h3>Level of Activity:</h3>
      <Select
        items={dataActivity}
        {...props.formik.getFieldProps("activity")}
        color={props.formik.errors.activity ? "danger" : "default"}
        errorMessage={
          props.formik.touched.activity && props.formik.errors.activity ? (
            <span>{props.formik.errors.activity}</span>
          ) : null
        }
        placeholder="low activity"
      >
        {(item) => <SelectItem key={item.id}>{item.type}</SelectItem>}
      </Select>
    </div>
  );
};

export default SelectedActivity;
