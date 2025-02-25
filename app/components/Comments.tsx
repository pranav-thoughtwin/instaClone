import { Modal } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { formatDistanceToNow } from "date-fns";
import useApi from "../hooks/useApi";
import { Comment, CommentsProps } from "@/types";

export default function Comments({ open, setOpen, data }: CommentsProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [likeCount, setLikeCount] = useState(0);
    const { apiCall } = useApi();

    const fetchComments = async () => {
        try {
            const response = await apiCall({
                url: `api/comment/${data?.id}`, method: 'GET'
            });
            setComments(response?.data);
        } catch (error) {
            console.log("Error fetching comments: ", error);
        }
    }

    const fetchLikeCount = async () => {
        try {
            const response = await apiCall({
                url: `api/like/count/${data?.id}`, method: 'GET'
            })
            if (response?.data) {
                setLikeCount(response?.data);
            }
        } catch (error) {
            console.log("Error fetching like status of post: ", error);
        }
    }

    useEffect(() => {
        fetchComments();
        fetchLikeCount();
    }, []);

    return (
        <div className="">
            <Modal
                open={open}
                onClose={setOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="flex items-center justify-center h-screen">
                    <div className="h-[550px] w-[800px] bg-white shadow-lg rounded-lg">
                        <div className="flex">
                            <div className="bg-black h-[550px] w-96 items-center flex">
                                <Image
                                    src={data?.imageUrl}
                                    height={400}
                                    width={400}
                                    alt={"Post image"}
                                />
                            </div>
                            <div className="h relative">
                                <div>
                                    <div className="flex m-3 mt-4">
                                        <div className="flex">
                                            <Image
                                                src={data?.user?.profilePicture ? data?.user?.profilePicture : '/dummy-profile-pic.png'}
                                                width={45}
                                                height={45}
                                                alt={"Post DP"}
                                                className="cursor-pointer rounded-full"
                                            />
                                            <div className="mt-2 ml-2">
                                                {data?.user?.username}
                                            </div>
                                        </div>
                                        <div onClick={() => setOpen(false)} className="p-2 cursor-pointer ml-96">
                                            <FaXmark />
                                        </div>
                                    </div>
                                    <div className="border"></div>
                                    <div className="p-4">
                                        <div className="flex text-sm">
                                            <div>
                                                <Image
                                                    src={data?.user?.profilePicture ? data?.user?.profilePicture : '/dummy-profile-pic.png'}
                                                    width={35}
                                                    height={35}
                                                    alt={"Post DP"}
                                                    className="cursor-pointer rounded-full"
                                                />
                                            </div>
                                            <div className="ml-2">
                                                <div className="flex">
                                                    <p>{data?.user?.username}</p>
                                                    <p className="ml-2">{data?.caption ? data?.caption : "No caption found"}</p>
                                                </div>
                                                <p className="text-gray-500">
                                                    {data?.createdAt && formatDistanceToNow(new Date(data?.createdAt))}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-56 overflow-auto">
                                        {comments.map((item, idx) => {
                                            return (
                                                <div key={idx} className="px-2 mt-4 w-full">
                                                    <div className="flex text-sm w-full">
                                                        <div>
                                                            <Image
                                                                src={data?.user?.profilePicture ? data?.user?.profilePicture : '/dummy-profile-pic.png'}
                                                                width={35}
                                                                height={35}
                                                                alt={"Post DP"}
                                                                className="cursor-pointer rounded-full"
                                                            />
                                                        </div>
                                                        <div className="ml-2 w-full flex items-center">
                                                            <div>
                                                                <div className="flex">
                                                                    <p>{item?.user?.username}</p>
                                                                    <p className="ml-2 break-all w-80">{item?.content ? item?.content : "No caption found"}</p>
                                                                </div>
                                                                <div className="mt-1 text-xs flex w-full">
                                                                    <div className="text-gray-500">
                                                                        {formatDistanceToNow(new Date(item?.createdAt), { addSuffix: true }).replace('about ', '')}
                                                                    </div>
                                                                    <div className="ml-2 text-gray-500 cursor-pointer">like</div>
                                                                    <div className="ml-2 text-gray-500 cursor-pointer">Reply</div>
                                                                </div>
                                                            </div>
                                                            <div className="ml-auto cursor-pointer">
                                                                <Image
                                                                    src={"/like.png"}
                                                                    height={14}
                                                                    width={14}
                                                                    alt="like icom"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="absolute bottom-0 w-full pb-2">
                                    <div className="flex mt-2 item-center justify-between px-2">
                                        <div className="flex">
                                            <Image
                                                // src={liked ? "/liked.png" : "/like.png"}
                                                src={"/like.png"}
                                                width={25}
                                                height={25}
                                                alt={"like icon"}
                                                className="cursor-pointer"
                                            // onClick={handleLike}
                                            />
                                            <Image
                                                src={"/comment.png"}
                                                width={25}
                                                height={25}
                                                alt={"comment icon"}
                                                className="ml-4 cursor-pointer"
                                            // onClick={() => setShowComments(true)}
                                            />
                                            <Image
                                                src={"/share.png"}
                                                width={25}
                                                height={25}
                                                alt={"share icon"}
                                                className="ml-4 cursor-pointer"
                                            />
                                        </div>
                                        <div>
                                            <Image
                                                src={"/bookmark.png"}
                                                width={25}
                                                height={25}
                                                alt={"bookmark icon"}
                                                className="ml-80 flex cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                    <div className="px-2 mt-3">
                                        <div className="font-bold text-gray-900">{likeCount} {likeCount > 1 ? "likes" : "like"}
                                        </div>
                                        <p className="text-sm text-gray-500">1 day ago</p>
                                    </div>
                                    <div className="border-b-0 border-t mt-4 border-r-0 border-l-0 pt-2 border-gray-300 border-2"></div>
                                    <div className="flex items-center justify-between pr-2">
                                        <div className="p-2 text-sm text-gray-400 font-semibold">
                                            Add a comment...
                                        </div>
                                        <div className="cursor-pointer font-semibold text-blue-300 text-sm">
                                            Post
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}