"use client";
import { IPost } from "@/types/post";
import { Button, Modal } from "antd";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TransformTextarea from "../transform-textarea";

const PostModal = ({
  mode,
  post,
  open,
  onCancel,
}: {
  mode: string;
  post?: IPost;
  open: boolean;
  onCancel: () => void;
}) => {
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
        : await axios.put(`${process.env.BASE_URL}posts/${post?.id}`, dataPost);
    };

    toast.promise(promise, {
      pending: `${mode === "create" ? "Create" : "Edit"} post is pending...`,
      success: `${mode === "create" ? "Create" : "Edit"} post successfully`,
      error: `Failed to ${mode === "create" ? "create" : "edit"} post`,
    });
    setDataPost({ title: "", body: "" });
    onCancel();
  };

  return (
    <Modal
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
                mode === "create"
                  ? !dataPost.body || !dataPost.title
                  : mode === "edit"
                  ? !post?.title || !post?.body
                  : false
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
          <div>
            <h1 className="font-semibold text-lg">Title:</h1>
             <TransformTextarea
              isCreate={mode === "create" ? true : false}
              name="title"
              value={mode === "create" ? dataPost.title : post?.title as string}
              onChange={changeHandlerPost}
            />
          </div>
          <div>
            <h1 className="font-semibold text-lg">Body:</h1>
            <TransformTextarea
              isCreate={mode === "create" ? true : false}
              name="body"
              value={mode === "create" ? dataPost.body : post?.body as string}
              onChange={changeHandlerPost}
            />
          </div>
        </div>
      ) : (
        <div>
          <h1 className="font-semibold text-lg">{post?.title}</h1>
          <p>{post?.body}</p>
        </div>
      )}
    </Modal>
  );
};

export default PostModal;
