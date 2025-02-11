import { Modal } from "@mui/material";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

interface FollowingProp {
    showFollowing: boolean;
    setShowFollowing: (arg: boolean) => void;
    followee: Follower[] | undefined
}

interface Follower {
    id: number,
    followerId: number,
    followeeId: number,
    createdAt: Date,
    followee: {
        username: string
        profilePicture: string,
        fullName: string
    }
}

export default function Following({ showFollowing, setShowFollowing, followee }: FollowingProp) {
    const handleClose = () => {
        setShowFollowing(false);
    }
    console.log("Followee: ", followee);
    return (
        <div>
            <Modal
                open={showFollowing}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="flex items-center justify-center h-screen">
                    <div className="h-96 w-96 bg-white shadow-lg rounded-lg">
                        <div className="flex items-center">
                            <div className="mx-auto w-fit m-2 flex items-center">
                                <div className="font-semibold">
                                    Following
                                </div>
                            </div>
                            <div onClick={handleClose} className="mr-4 cursor-pointer">
                                <FaXmark />
                            </div>
                        </div>
                        <div className="border-t border-gray-300"></div>
                        <div className="p-4 space-y-3">
                            <div className="w-full items-center mb-4 bg-gray-100 flex pl-4 p-1 rounded-md">
                                <FaSearch />
                                <input className="bg-gray-100 ml-2 focus:outline-none focus:ring-0 focus:border-transparent" placeholder="Search" type="text" />
                            </div>
                            {followee && followee.map((item, idx) => {
                                const imgSrc = item?.followee?.profilePicture ? item?.followee?.profilePicture : '/dummy-profile-pic.png'
                                return (
                                    <div className="flex justify-between" key={idx}>
                                        <div className="flex items-center">
                                            <div>
                                                <Image
                                                    src={imgSrc}
                                                    height={40}
                                                    width={40}
                                                    alt={`${item?.followee?.username}'s picture`}
                                                    className="rounded-full"
                                                />
                                            </div>
                                            <div className="text-sm ml-4">
                                                <p className="font-bold">{item?.followee?.username}</p>
                                                <p className="text-gray-500">{item?.followee?.fullName}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <button className="bg-gray-200 text-sm ml-auto rounded-lg px-4 font-semibold py-1">Following</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}