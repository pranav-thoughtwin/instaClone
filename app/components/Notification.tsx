import Image from "next/image";

export default function Notification() {
    const notifications = ['notification', 'notification', 'notification'];
    return (
        <div className="border-l absolute top-0 left-16 w-96 h-[600px] shadow-lg rounded-2xl bg-white">
            <div className="p-6 pt-6">
                <div className="text-2xl font-medium">
                    Notifications
                </div>
            </div>
            <div className="pl-6">
                <span className="font-semibold">Today</span>
                {notifications.map((ele, idx) => {
                    return (
                        <div className="mt-4 flex items-center w-full">
                            <div>
                                <Image
                                    src={"/dog.png"}
                                    height={40}
                                    width={40}
                                    alt="Profile picture"
                                    className="rounded-full"
                                />
                            </div>
                            <div className="text-xs ml-4">
                                <div className="font-bold">
                                    roirin_femlivart2931ec
                                </div>
                                <div>
                                    started following you. <span className="text-gray-500">1d</span>
                                </div>
                            </div>
                            <div>
                                <button className="flex bg-[#c4c4c4] text-sm rounded-md px-3 py-1 ml-14 ">Requested</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}