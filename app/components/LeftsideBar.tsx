'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/types";
interface LeftsideBarProps {
    setShowSearch: () => void
    setShowNotification: () => void
    setShowCreate: () => void
}

export default function LeftsideBar({ setShowSearch, setShowNotification, setShowCreate }: LeftsideBarProps) {
    const router = useRouter();
    // const [showIcon, setShowIcon] = useState(false);
    const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

    useEffect(() => {
        const token = Cookie.get("token");
        if (token) {
            const decoded = jwtDecode<DecodedToken>(token);
            setDecodedToken(decoded);
        }
    }, []);

    const handleSignout = () => {
        Cookie.remove("token", { path: '/' });
        router.push('/accounts/login');
        toast("Signout successful");
    }

    const items = [
        {
            name: 'Home',
            icon: 'home',
            onClick: () => { router.push('/') }
        },
        {
            name: 'Search',
            icon: 'search',
            onClick: () => {
                setShowSearch();
                // setShowIcon((prev => !prev));
            }
        },
        {
            name: 'Explore',
            icon: 'explore',
            onClick: () => { }
        },
        {
            name: 'Reels',
            icon: 'reels',
            onClick: () => { }
        },
        {
            name: 'Messages',
            icon: 'messages',
            onClick: () => { }
        },
        {
            name: 'Notifications',
            icon: 'notifications',
            onClick: () => {
                setShowNotification();
                // setShowIcon((prev => !prev))
            }
        },
        {
            name: 'Create',
            icon: 'create',
            onClick: () => { setShowCreate() }
        },
        {
            name: `${decodedToken?.name}`,
            icon: 'profile',
            onClick: () => { router.push('/profile') }
        },
        {
            name: 'Signout',
            icon: 'logout',
            onClick: () => { handleSignout() }
        },
    ];

    return (
        <div className="w-56 border-r pl-5 pt-8 h-screen">
            <div className="">
                <Image
                    // src={showIcon ? "/instaIcon.png" : "/insta.png"}
                    // width={showIcon ? 24 : 120}
                    // height={showIcon ? 24 : 120}
                    src={"/insta.png"}
                    width={120}
                    height={120}
                    alt="Insta logo"
                />
            </div>

            <div className="mt-10 space-y-8">
                {items.map((item, idx) => {
                    return (
                        <div onClick={item.onClick} key={idx} className="flex space-x-6 items-center cursor-pointer">
                            <div>
                                <Image
                                    src={`/${item.icon}.png`}
                                    width={item.icon === 'logout' ? 20 : 25}
                                    height={item.icon === 'logout' ? 20 : 25}
                                    alt={item.name}
                                />
                            </div>
                            <div key={idx}>{item.name}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}