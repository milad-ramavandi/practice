"use client";
import PostCardLists from "@/components/post-card-lists";
import PostModal from "@/components/post-Modal";
import { Button, Pagination } from "antd";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useQuery({
    queryKey: ["posts", `page${page}`],
    queryFn: async () =>
      await axios
        .get(`${process.env.BASE_URL}posts?_page=${page}&_limit=3`)
        .then((res) => res.data),
  });

  const showModal = () => setIsModalOpen(true)
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="w-screen h-screen flex flex-col space-y-6 justify-center items-center p-3">
      {!isLoading && <Button onClick={showModal}>Create post</Button>}
      <PostCardLists isLoading={isLoading} posts={data}/>
      {!isLoading && (
        <Pagination defaultCurrent={page} total={200} onChange={setPage} />
      )}
      <PostModal open={isModalOpen} onCancel={handleCancel} mode={"create"}/>
    </div>
  );
}
