"use client";
import { IPost } from "@/types/post";
import { Button, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { ChangeEventHandler, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

const nameArray = [
  { id: 1, name: "title" },
  { id: 2, name: "body" },
];

const PostModal = ({
  mode,
  postID,
  open,
  onCancel,
}: {
  mode: string;
  postID?: number;
  open: boolean;
  onCancel: () => void;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts", postID],
    queryFn: async () =>
      mode !== "create" &&
      (await axios
        .get(`${process.env.BASE_URL}posts/${postID}`)
        .then((res) => res.data)),
  });
  const [dataPost, setDataPost] = useState<IPost>({
    title: "",
    body: "",
  });

  const changeHandlerPost: ChangeEventHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setDataPost({ ...dataPost, [name]: value });
  };

  const editOrCreatePost = () => {
    const promise = async () => {
      mode === "create"
        ? await axios.post(`${process.env.BASE_URL}posts`, dataPost)
        : await axios.put(`${process.env.BASE_URL}posts/${postID}`, dataPost);
    };

    toast.promise(promise, {
      pending: `${mode === "create" ? "Create" : "Edit"} post is pending...`,
      success: `${mode === "create" ? "Create" : "Edit"} post successfully`,
      error: `Failed to ${mode === "create" ? "create" : "edit"} post`,
    });
    onCancel();
  };

  return (
    <Modal
      loading={isLoading}
      open={open}
      onCancel={onCancel}
      title={
        mode === "create" ? "Create post" : mode === "edit" ? "Edit post" : null
      }
      closable={mode === "expand" ? false : true}
      footer={
        <>
          {mode !== "expand" ? (
            <Button
              type="primary"
              onClick={editOrCreatePost}
              disabled={
                mode !== "create"
                  ? !data?.title || !data?.body
                  : !dataPost.body || !dataPost.title
              }
            >
              Apply
            </Button>
          ) : null}
        </>
      }
    >
      {mode !== "expand" ? (
        <div className="space-y-2">
          {nameArray.map((item) => (
            <div key={item.id}>
              <h1 className="font-semibold text-lg">{item.name}</h1>
              <TextArea
                allowClear
                name={item.name}
                defaultValue={mode === "create" ? dataPost.title : data?.title}
                onChange={changeHandlerPost}
                autoSize
              />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1 className="font-semibold text-lg">{data?.title}</h1>
          <p>{data?.body}</p>
        </div>
      )}
    </Modal>
  );
};

export default PostModal;
