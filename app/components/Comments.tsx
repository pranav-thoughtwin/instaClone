import { Modal } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { formatDistanceToNow } from "date-fns";
import useApi from "../hooks/useApi";
import { Comment, CommentsProps } from "@/types";

export default function Comments({ open, setOpen, data }: CommentsProps) {
    const [comments, setComments] = useState<Comment[]>([]);
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

    useEffect(() => {
        fetchComments();
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
                                        <div className="ml-2 mt-1">
                                            <div className="flex">
                                                <p>{data?.user?.username}</p>
                                                <p className="ml-2">{data?.caption ? data?.caption : "No caption found"}</p>
                                            </div>
                                            <p className="text-gray-500">
                                                {formatDistanceToNow(new Date(data?.createdAt))}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {comments.map((item, idx) => {
                                    return (
                                        <div key={idx} className="px-4 mt-4 w-full">
                                            <div className="flex text-sm items-center w-full">
                                                <div>
                                                    <Image
                                                        src={data?.user?.profilePicture ? data?.user?.profilePicture : '/dummy-profile-pic.png'}
                                                        width={35}
                                                        height={35}
                                                        alt={"Post DP"}
                                                        className="cursor-pointer rounded-full"
                                                    />
                                                </div>
                                                <div className="ml-2 mt-1 w-full">
                                                    <div className="flex">
                                                        <p>{item?.user?.username}</p>
                                                        <p className="ml-2">{item?.content ? item?.content : "No caption found"}</p>
                                                    </div>
                                                    <div className="text-xs text-gray-500 flex w-full">
                                                        <div className="">
                                                            {formatDistanceToNow(new Date(item?.createdAt), { addSuffix: true }).replace('about ', '')}                                                        </div>
                                                        <div className="ml-2">like</div>
                                                        <div className="ml-2">Reply</div>
                                                        <div className="ml-auto">
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
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}