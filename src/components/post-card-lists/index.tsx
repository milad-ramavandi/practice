"use client";

import { IPost } from "@/types/post";
import { Card, Spin } from "antd";
import React, { useState } from "react";
import Delete from "../icons/delete";
import Expand from "../icons/expand";
import axios from "axios";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import PostModal from "../post-Modal";
import Edit from "../icons/edit";

const PostCardLists = ({
  isLoading,
  posts,
}: {
  isLoading: boolean;
  posts: IPost[];
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modeModal, setModeModal] = useState<string>("")
  const [post, setPost] = useState<IPost>({title:"", body:""});
  const queryClient = useQueryClient();
  const deletePost = (post: IPost) => {
    const promise = async () => {
      await axios.delete(`${process.env.BASE_URL}posts/${post.id}`);
    };

    toast.promise(promise, {
      pending: "Delete post is pending...",
      success: "Delete post Successfully",
      error: "Failed to delete post",
    });

    queryClient.invalidateQueries("posts");
  };
  const showExpandModal = (post: IPost) => {
    setModeModal("expand")
    setIsModalOpen(true);
    setPost({title:post.title, body:post?.body});
  };
  const showEditModal = (post: IPost) => {
    setModeModal("edit");
    setIsModalOpen(true);
    setPost({id:post.id, title:post.title, body:post?.body});
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0">
        {isLoading ? (
          <Spin size="large" />
        ) : (
          posts?.map((item: IPost) => (
            <Card
              key={item.id}
              title={item.title}
              actions={[
                <Delete onClick={() => deletePost(item)} />,
                <Expand onClick={() => showExpandModal(item)} />,
                <Edit onClick={() => showEditModal(item)}/>
              ]}
              className="max-w-[300px]"
              classNames={{
                body: "max-h-40 truncate",
              }}
            >
              {item.body}
            </Card>
          ))
        )}
      </div>
      <PostModal post={post} open={isModalOpen} onCancel={handleCancel} mode={modeModal}/>
    </>
  );
};

export default PostCardLists;
