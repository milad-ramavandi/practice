"use client";
import { Button, Modal } from "antd";
import axios from "axios";
import React, { ChangeEventHandler, useState } from "react";
import { useQuery } from "react-query";
import Edit from "../icons/edit";
import { Input } from "antd";
import { toast } from "react-toastify";
const { TextArea } = Input;

interface IEditPost {
  title: string;
  body: string;
}

const PostModal = ({
  postID,
  open,
  onCancel
}: {
  postID: number;
  open: boolean;
  onCancel: () => void;
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editDataPost, setEditDataPost] = useState<IEditPost>({
    title: "",
    body: "",
  });
  const { data, isLoading } = useQuery({
    queryKey: ["post", `postID:${postID}`],
    queryFn: async () =>
      await axios
        .get(`${process.env.BASE_URL}posts/${postID}`)
        .then((res) => res.data),
  });

  const editPost = async () => {
    setIsEdit(true)
    if (isEdit) {
      const promise = async () => {
        await axios.put(`${process.env.BASE_URL}posts/${postID}`, {
          ...data,
          ...editDataPost,
        });
      };
      toast.promise(promise, {
        pending: "Edit post is pending...",
        success: "Edit post successfully",
        error: "Failed to edit post",
      });
      setIsEdit(false)
      onCancel()
    }

  };

  const handleTitlePost: ChangeEventHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => setEditDataPost({ ...editDataPost, title: e.target.value });
  const handleBodyPost: ChangeEventHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => setEditDataPost({ ...editDataPost, body: e.target.value });
  const clearEditData = () => setEditDataPost({ title: "", body: "" });
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      afterClose={() => {
        setIsEdit(false)
        setEditDataPost({ title: "", body: "" })
      }}
      footer={
        <div className="flex justify-end space-x-2">
          {isEdit && (
            <Button
              onClick={clearEditData}
              disabled={editDataPost.title === "" && editDataPost.body === ""}
            >
              Clear
            </Button>
          )}
          <Button
            type="primary"
            icon={!isEdit && <Edit />}
            onClick={editPost}
            disabled={isEdit && (editDataPost.title === "" || editDataPost.body === "")}
          >
            {isEdit ? "Apply" : "Edit"}
          </Button>
        </div>
      }
      classNames={{
        body: "my-4",
      }}
      closable={false}
      loading={isLoading}
    >
      {isEdit ? (
        <div className="space-y-2">
          <div>
            <h1 className="font-semibold text-lg">Title:</h1>
            <TextArea
              value={editDataPost.title}
              onChange={handleTitlePost}
              autoSize
            />
          </div>
          <div>
            <h1 className="font-semibold text-lg">Body:</h1>
            <TextArea
              value={editDataPost.body}
              onChange={handleBodyPost}
              autoSize
            />
          </div>
        </div>
      ) : (
        <>
          <h1 className="font-semibold text-lg">{data?.title}</h1>
          <p>{data?.body}</p>
        </>
      )}
    </Modal>
  );
};

export default PostModal;
