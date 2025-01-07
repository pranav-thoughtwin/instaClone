import Image from "next/image";

export default function RightsideBar() {
    const suggestions = ['grayDP', 'grayDP', 'grayDP', 'grayDP', 'grayDP']
    return (
        <div className="w-80 ml-auto">
            <div className="mt-14 flex items-center">
                <div>
                    <Image
                        src={"/profile.png"}
                        width={60}
                        height={60}
                        alt={"profile"}
                        className="cursor-pointer"
                    />
                </div>
                <div className="ml-4 cursor-pointer">
                    <div className="font-bold">
                        upvox_
                    </div>
                    <div className="text-gray-500">
                        Upvox
                    </div>
                </div>
                <div className="text-sm text-blue-500 ml-auto pr-4 cursor-pointer">
                    Switch
                </div>
            </div>
            <div className="flex text-sm pr-4 mt-6 justify-between">
                <div className="font-semibold text-gray-400">
                    Suggestions for you
                </div>
                <div className="font-bold cursor-pointer">
                    See all
                </div>
            </div>
            <div className="mt-2">
                {suggestions.map((item, idx) => {
                    return (
                        <div key={idx} className="flex mt-1 items-center">
                            <div>
                                <Image
                                    src={`/${item}.png`}
                                    width={45}
                                    height={45}
                                    alt={"profile"}
                                    className="cursor-pointer"
                                />
                            </div>
                            <div className="text-sm ml-2 cursor-pointer">
                                <div className="font-semibold">
                                    imkir
                                </div>
                                <div className="text-gray-500 text-[12px]">
                                    Follows you
                                </div>
                            </div>
                            <div className="text-blue-500 ml-28 text-sm font-bold cursor-pointer">
                                Follow
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}