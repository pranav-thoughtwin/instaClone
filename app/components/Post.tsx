import Image from "next/image";
import { FaEllipsisH } from "react-icons/fa";
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import useApi from "../hooks/useApi";

interface Post {
    id: number;
    userId: number;
    imageUrl: string;
    caption: string;
    createdAt: string;
    user: {
        username: string;
        profilePicture: string
    };
}

interface PostProps {
    data: Post
}

export default function Post({ data }: PostProps) {
    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState("");
    const [showComments, setShowComments] = useState(false);
    const { apiCall } = useApi();
    const router = useRouter();

    const handleClick = () => {
        router.push(`/profile/${data?.user.username}`);
    }

    const handleLike = async () => {
        if (!liked) {
            const response = await apiCall({
                url: `api/like`, method: 'POST', data: {
                    postId: data?.id
                }
            })
            if (response.status === 200) {
                toast("Post liked");
            }
            setLiked(true);
        }
        else {
            toast("Already liked");
        }
    }

    const fetchLikeStatus = async () => {
        try {
            const response = await apiCall({
                url: `api/like/status`, method: 'POST', data: {
                    postId: data?.id
                }
            })
            if (response?.data?.length > 0) {
                setLiked(true);
            }
            else {
                setLiked(false);
            }
        } catch (error) {
            console.log("Error fetching like status of post: ", error);
        }
    }

    const postComment = async () => {
        try {
            const response = await apiCall({
                url: `api/comment`, method: `POST`, data: {
                    postId: data?.id,
                    content: comment
                }
            })
            setComment("");
            console.log(response)
            toast("Comment posted");
        } catch (error) {
            console.log("Error posting comment: ", error);
        }
    }

    const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    }

    useEffect(() => {
        fetchLikeStatus();
    }, []);

    return (
        <div className="border-b mb-4 pb-4 border-gray-300 ml-40 w-[450px] mt-6">
            {showComments && <Comments data={data} open={showComments} setOpen={setShowComments} />}
            <div className="flex justify-between items-center w-full mx-auto">
                <div className="flex items-center">
                    <div className="flex items-center" onClick={handleClick}>
                        <div>
                            <Image
                                src={data?.user?.profilePicture ? data?.user?.profilePicture : '/dummy-profile-pic.png'}
                                width={40}
                                height={40}
                                alt={"Post DP"}
                                className="cursor-pointer rounded-full"
                            />
                        </div>
                        <div className="mx-2 cursor-pointer">
                            {data?.user?.username}
                        </div>
                    </div>
                    <div className="ml-1">
                        <Image
                            src={"/verified.png"}
                            width={12}
                            height={12}
                            alt={"Verified icon"}
                        />
                    </div>
                    <div className="w-36 text-x ml-2 text-gray-500">
                        • {formatDistanceToNow(data.createdAt)}
                    </div>
                </div>
                <div className=" cursor-pointer">
                    <FaEllipsisH color="grey" />
                </div>
            </div>
            <div className="mt-2">
                <Image
                    src={data?.imageUrl}
                    width={500}
                    height={500}
                    alt={"Verified icon"}
                />
            </div>
            <div className="flex mt-2 item-center">
                <Image
                    src={liked ? "/liked.png" : "/like.png"}
                    width={25}
                    height={25}
                    alt={"like icon"}
                    className="cursor-pointer"
                    onClick={handleLike}
                />
                <Image
                    src={"/comment.png"}
                    width={25}
                    height={25}
                    alt={"comment icon"}
                    className="ml-4 cursor-pointer"
                    onClick={() => setShowComments(true)}
                />
                <Image
                    src={"/share.png"}
                    width={25}
                    height={25}
                    alt={"share icon"}
                    className="ml-4 cursor-pointer"
                />
                <Image
                    src={"/bookmark.png"}
                    width={25}
                    height={25}
                    alt={"bookmark icon"}
                    className="ml-80 flex cursor-pointer"
                />
            </div>
            <div className="font-bold text-gray-800 mt-2">
                741,368 likes
            </div>
            <div className="flex space-x-2">
                <div className="font-bold text-gray-800">
                    lewishamilton
                </div>
                <div>
                    Parabéns Ayrton, minha inspiração sempre 🇧🇷
                </div>
            </div>
            <div className="text-sm font-bold mt-2 text-gray-800 cursor-pointer">
                See translation
            </div>
            <div onClick={() => setShowComments(true)} className="text-gray-500 mt-2 text-sm cursor-pointer">
                View all 13,384 comments
            </div>
            <div className="text-gray-500 mt-2 space-x-1 flex text-sm">
                <p className="font-bold">thepranavshukla</p>
                <p>Dummy comment</p>
            </div>
            <div className="text-gray-800 mt-2 justify-between flex text-sm ">
                <input value={comment} onChange={handleComment} type="text" placeholder="Add a comment…" className="p-2 focus:outline-none focus:border-none -m-2" />
                {comment.length > 0 && <p onClick={postComment} className="text-blue-400 font-bold cursor-pointer">Post</p>}
            </div>
        </div>
    )
}