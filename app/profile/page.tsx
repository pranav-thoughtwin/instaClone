'use client'
import { useState } from "react";
import LeftsideBar from "../components/LeftsideBar";
import Search from "../components/Search";
import Image from "next/image";
import { FaGear, FaUserGear } from "react-icons/fa6";
import Notification from "../components/Notification";

export default function profile() {
    const [showSearch, setShowSearch] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const posts = ['post', 'post', 'post', 'post', 'post', 'post', 'post',];
    return (
        <div className="flex">
            <LeftsideBar
                setShowNotification={() => setShowNotification((prev => !prev))}
                setShowSearch={() => setShowSearch((prev => !prev))}
            />
            {showSearch && <Search />}
            {showNotification && <Notification />}
            <div className="mt-14 ml-16 w-[950px]">
                <div className="ml-20 flex">
                    <div>
                        <Image
                            src={"/profile.png"}
                            width={140}
                            height={140}
                            alt="profile logo"
                        />
                    </div>
                    <div className="flex flex-col ml-32">
                        <div className="flex items-center">
                            <div className="text-xl">
                                upvox_
                            </div>
                            <div className="ml-4 space-x-2">
                                <button className="px-4 rounded-lg bg-[#EFEFEF] text-sm  p-2">Edit profile</button>
                                <button className="px-4 rounded-lg bg-[#EFEFEF] text-sm  p-2">Ad tools</button>
                            </div>
                            <div className="ml-3 cursor-pointer">
                                <Image
                                    src={"/gear.png"}
                                    width={25}
                                    height={25}
                                    alt="profile logo"
                                />
                            </div>
                        </div>
                        <div className="space-x-8 flex mt-4">
                            <div className="flex">
                                <span className="font-bold">11</span>
                                <div className="ml-1">posts</div>
                            </div>
                            <div className="flex">
                                <span className="font-bold">41</span>
                                <div className="ml-1">followers</div>
                            </div>
                            <div className="flex">
                                <span className="font-bold">17</span>
                                <div className="ml-1">following</div>
                            </div>
                        </div>
                        <div className="text-sm mt-6">
                            <div className="font-bold">
                                Upvox
                            </div>
                            <div className="text-gray-400">
                                Product/service
                            </div>
                            <div>
                                Your favourite fun clips 🎦 in your language 🌎
                            </div>
                            <div className="text-blue-600 font-bold cursor-pointer">
                                upvox.net
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full border-t border-gray-300 mt-10"></div>
                <div className="mx-auto w-fit mt-3">
                    <div className="flex space-x-16">
                        <div className="flex items-center">
                            <div className="mr-2">
                                <Image
                                    src={"/grid.png"}
                                    width={14}
                                    height={14}
                                    alt="grid logo"
                                />
                            </div>
                            <div className="text-sm">Posts</div>
                        </div>
                        <div className="flex items-center">
                            <div className="mr-2">
                                <Image
                                    src={"/reels.png"}
                                    width={14}
                                    height={14}
                                    alt="grid logo"
                                />
                            </div>
                            <div className="text-sm">Reels</div>
                        </div>
                        <div className="flex items-center">
                            <div className="mr-2">
                                <Image
                                    src={"/bookmark.png"}
                                    width={14}
                                    height={14}
                                    alt="bookmark logo"
                                />
                            </div>
                            <div className="text-sm">Saved</div>
                        </div>
                        <div className="flex items-center">
                            <div className="mr-2">
                                <Image
                                    src={"/tag.png"}
                                    width={14}
                                    height={14}
                                    alt="tag logo"
                                />
                            </div>
                            <div className="text-sm">Tagged</div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2 mb-4">
                    {posts.map((post, idx) => {
                        return (
                            <div key={idx}>
                                <Image
                                    src={"/post2.png"}
                                    width={340}
                                    height={340}
                                    alt="Post"
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}