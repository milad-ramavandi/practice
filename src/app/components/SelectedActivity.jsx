import { Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { dataActivity } from "../data/data";

const SelectedActivity = ({formik}) => {
  return (
    <div className=" space-y-4">
      <h3>Level of Activity:</h3>
      <Select
        items={dataActivity}
        {...formik.getFieldProps("activity")}
        color={formik.errors.activity ? "danger" : "default"}
        errorMessage={
          formik.touched.activity && formik.errors.activity ? (
            <span>{formik.errors.activity}</span>
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
