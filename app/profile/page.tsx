'use client'
import { useEffect, useState } from "react";
import LeftsideBar from "../components/LeftsideBar";
import Search from "../components/Search";
import Image from "next/image";
import Notification from "../components/Notification";
import { jwtDecode, JwtPayload } from 'jwt-decode';
import Cookie from "js-cookie";
import Create from "../components/Create";
import Followers from "../components/Followers";
import Following from "../components/Following";
import useApi from "../hooks/useApi";

interface DecodedToken extends JwtPayload {
    id?: number
}

interface User {
    id: number,
    username: string,
    email: string,
    password: string,
    fullName: string,
    bio: string,
    profilePicture: string,
    createdAt: Date
}

interface Follower {
    id: number,
    followerId: number,
    followeeId: number,
    createdAt: Date,
    follower: {
        username: string,
        profilePicture: string,
        fullName: string
    }
}

interface Followee {
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
interface Post {
    id: number,
    caption: string,
    imageUrl: string
}

export default function Profile() {
    const [showSearch, setShowSearch] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [userData, setUserData] = useState<User>();
    const [bio, setBio] = useState<string>("");
    const [editing, setEditing] = useState(false);
    const [followers, setFollowers] = useState<Follower[]>();
    const [following, setFollowing] = useState<Followee[]>();
    const [showCreate, setShowCreate] = useState(false);
    const [posts, setPosts] = useState<Post[]>();
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
    const { apiCall } = useApi();

    const token = Cookie.get("token");
    let decodedToken: DecodedToken | null = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }

    const fetchFollowers = async () => {
        try {
            const response = await apiCall({ url: `api/follower/${decodedToken?.id}`, method: 'GET' });
            setFollowers(response.data.followers);
            setFollowing(response.data.following);
        } catch (error) {
            console.log("Error fetching followers: ", error);
        }
    }

    const handleFollowers = () => {
        setShowFollowers(true);
    }

    const handleFollowing = () => {
        setShowFollowing(true);
    }

    const fetchPosts = async () => {
        try {
            const response = await apiCall({ url: `api/post/${decodedToken?.id}`, method: 'GET' });
            setPosts(response.data);
        } catch (error) {
            console.log("Error fetching posts: ", error);
        }
    }

    const fetchData = async () => {
        try {
            let data;
            if (decodedToken) {
                data = await apiCall({ url: `api/profile/id/${decodedToken?.id}`, method: 'GET' })
            }
            setUserData(data?.data);
            setBio(data?.data?.bio);
        } catch (error) {
            console.log("Error occured while fetching user data: ", error);
        }
    }

    const handleSave = async () => {
        try {
            const response = await apiCall({
                url: `api/profile/id/${decodedToken?.id}`, method: 'POST', data: {
                    bio
                }
            })
            console.log("Res: ", response);
        } catch (error) {
            console.log("Error updating profile: ", error);
        }
    }

    useEffect(() => {
        fetchData();
        fetchFollowers();
        fetchPosts();
    }, []);

    return (
        <div className="flex">
            <LeftsideBar
                setShowSearch={() => {
                    setShowSearch((prev => !prev));
                    setShowNotification(false);
                    setShowCreate(false)
                }}
                setShowNotification={() => {
                    setShowNotification((prev => !prev));
                    setShowSearch(false);
                    setShowCreate(false)
                }}
                setShowCreate={() => {
                    setShowCreate((prev => !prev))
                    setShowSearch(false);
                    setShowNotification(false);
                }}
            />
            {showSearch && <Search />}
            {showNotification && <Notification />}
            {showCreate && <Create showCreate={showCreate} setShowCreate={setShowCreate} />}
            {showFollowers && <Followers followers={followers} showFollowers={showFollowers} setShowFollowers={setShowFollowers} />}

            {showFollowing && <Following followee={following} showFollowing={showFollowing} setShowFollowing={setShowFollowing} />}

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
                                {userData?.username}
                            </div>
                            <div className="ml-4 space-x-2">
                                <button className="px-4 rounded-lg bg-[#EFEFEF] text-sm  p-2" onClick={() => {
                                    setEditing((prev => !prev))
                                    if (editing) {
                                        handleSave();
                                    }
                                }}>
                                    {editing ? "Save" : "Edit profile"}
                                </button>
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
                                {/* <span className="font-bold">   */}
                                <span className="font-bold">                                    {posts && posts?.length > 0 ? posts?.length : 0}
                                </span>
                                <div className="ml-1">posts</div>
                            </div>
                            <div onClick={handleFollowers} className="flex  cursor-pointer">
                                <span className="font-bold">
                                    {followers && followers?.length > 0 ? followers?.length : 0}
                                </span>
                                <div className="ml-1">followers</div>
                            </div>
                            <div onClick={handleFollowing} className="flex cursor-pointer">
                                <span className="font-bold">                                    {following && following?.length > 0 ? following?.length : 0}
                                </span>
                                <div className="ml-1">following</div>
                            </div>
                        </div>
                        <div className="text-sm mt-6">
                            <div className="font-bold">
                                {userData?.fullName}
                            </div>
                            <div className="text-gray-400">
                                Product/service
                            </div>
                            <div>
                                {editing ? <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} /> : bio}
                                {/* {userData?.bio} */}
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
                <div className="mt-6 grid grid-cols-3 gap-4 mb-4">
                    {posts && posts.slice().reverse().map((post, idx) => {
                        return (
                            <div key={idx}>
                                <Image
                                    src={post.imageUrl}
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