'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LeftsideBarProps {
    setShowSearch: () => void
    setShowNotification: () => void
}

export default function LeftsideBar({ setShowSearch, setShowNotification }: LeftsideBarProps) {
    const router = useRouter();
    const [showIcon, setShowIcon] = useState(false);

    const items = [
        {
            name: 'Home',
            icon: 'home',
            onClick: () => { router.push('/') }
        },
        {
            name: 'Search',
            icon: 'search',
            onClick: () => { setShowSearch(); setShowIcon((prev => !prev)) }
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
            onClick: () => { setShowNotification(); setShowIcon((prev => !prev)) }
        },
        {
            name: 'Create',
            icon: 'create',
            onClick: () => { }
        },
        {
            name: 'Profile',
            icon: 'profile',
            onClick: () => { router.push('/profile') }
        },
        {
            name: 'More',
            icon: 'more',
            onClick: () => { }
        },
    ];

    return (
        <div className="w-56 border-r pl-5 pt-8 h-screen">
            <div className="">
                <Image
                    src={showIcon ? "/instaIcon.png" : "/insta.png"}
                    width={showIcon ? 24 : 120}
                    height={showIcon ? 24 : 120}
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
                                    width={25}
                                    height={25}
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