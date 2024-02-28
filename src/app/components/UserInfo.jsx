import React from "react";
import * as Yup from "yup";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useFormik } from "formik";
import SelectedActivity from "./SelectedActivity";
import EditHeight from "./EditHeight";
import EditWeight from "./EditWeight";
import EditPicture from "./EditPicture";
import SubmitForm from "./SubmitForm";

const UserInfo = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const formik = useFormik({
    initialValues: {
      imageURL: "",
      baseWeight: "",
      decimalWeight: "",
      unitWeight: "",
      baseHeight: "",
      decimalHeight: "",
      unitHeight: "",
      activity: "",
    },
    validationSchema: Yup.object({
      imageURL: Yup.mixed().required("Chosse your image for profile"),
      baseWeight: Yup.string().matches(/^[1-9][0-9]*$/, 'Weight is not valid').required("fill the input"),
      decimalWeight: Yup.string().matches( /^(0(\.\d+))$/, 'Choose number between 0 and less than 1').required("fill the input"),
      unitWeight: Yup.string().required("Select one of the option"),
      baseHeight: Yup.string().matches(/^[1-9][0-9]*$/, 'Height is not valid').required("fill the input"),
      decimalHeight: Yup.string().matches( /^(0(\.\d+))$/, 'Choose number between 0 and less than 1').required("fill the input"),
      unitHeight: Yup.string().required("Select one of the option"),
      activity: Yup.string().required("Select one of the option"),
    }),
    onSubmit: (values) => console.log(values),
  });

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Edit Entered Information</ModalHeader>
          <ModalBody>
            <form
              className="flex flex-col space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <EditPicture formik={formik}/>
              <EditWeight formik={formik} />
              <EditHeight formik={formik} />
              <SelectedActivity formik={formik} />
              <SubmitForm/>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserInfo;

// id instead of type in select activity, weight and height

// image
