'use client'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import LeftsideBar from '@/app/components/LeftsideBar';
import Search from '@/app/components/Search';
import Notification from '@/app/components/Notification';
import Create from '@/app/components/Create';
import Followers from '@/app/components/Followers';
import Following from '@/app/components/Following';
import Image from 'next/image';
import useApi from '@/app/hooks/useApi';
import { DecodedToken, Followee, Follower, Post, User } from '@/types';

const Page = () => {
    const pathname = usePathname();
    const { apiCall } = useApi();

    const [showSearch, setShowSearch] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [userData, setUserData] = useState<User>();
    const [followers, setFollowers] = useState<Follower[]>();
    const [following, setFollowing] = useState<Followee[]>();
    const [showCreate, setShowCreate] = useState(false);
    const [posts, setPosts] = useState<Post[]>();
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);

    const token = Cookie.get("token");
    let decodedToken: DecodedToken | null = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }

    const fetchPosts = async (userId: number) => {
        try {
            const response = await apiCall({ url: `api/post/${userId}`, method: `GET` });
            console.log("Res: ", response);
            setPosts(response.data);
        } catch (error) {
            console.log("Error fetching posts: ", error);
        }
    }

    const fetchData = async (userName: string) => {
        try {
            let data;
            if (decodedToken) {
                data = await apiCall({ url: `api/profile/name/${userName}`, method: `GET` });
            }
            console.log("User data: ", data?.data);
            setUserData(data?.data[0]);
        } catch (error) {
            console.log("Error occured while fetching user data: ", error);
        }
    }

    const fetchFollowers = async (userId: number) => {
        try {
            const response = await apiCall({ url: `api/follower/${userId}`, method: 'GET' });
            console.log("Followers: ", response);
            setFollowers(response?.data?.followers);
            setFollowing(response?.data?.following);
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

    useEffect(() => {
        if (pathname) {
            const userName = pathname.split("/").pop();
            console.log("Username: ", userName);
            if (userName) {
                console.log("Setting profile: ", userName);
                fetchData(userName);
            }
        }
    }, []);

    useEffect(() => {
        if (userData?.id) {
            fetchFollowers(userData?.id);
            fetchPosts(userData?.id);
        }
    }, [userData]);

    return (
        <div className='flex'>
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
            {showSearch && <Search showSearch={showSearch} setShowSearch={setShowSearch}/>}
            {showNotification && <Notification showNotification={showNotification} setShowNotification={setShowNotification} />}
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
                                <button className="px-4 rounded-lg bg-[#EFEFEF] text-sm  p-2">
                                    Edit profile
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
                                {userData?.bio}
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
    );
};

export default Page;