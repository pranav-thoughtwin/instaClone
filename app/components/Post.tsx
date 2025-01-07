import Image from "next/image";
import { FaEllipsisH } from "react-icons/fa";

export default function Post() {
    return (
        <div className="border-b mb-4 pb-4 border-gray-300 ml-40 w-[450px] mt-6">
            <div className="flex items-center mx-auto">
                <Image
                    src={"/postDP.png"}
                    width={45}
                    height={45}
                    alt={"Post DP"}
                    className="cursor-pointer"
                />
                <div className="mx-2 cursor-pointer">
                    lewishamilton
                </div>
                <Image
                    src={"/verified.png"}
                    width={12}
                    height={12}
                    alt={"Verified icon"}
                />
                <div className="text-xs ml-2 text-gray-500">
                    • 5h
                </div>
                <div className="ml-56 cursor-pointer">
                    <FaEllipsisH color="grey" />
                </div>

            </div>
            <div className="mt-2">
                <Image
                    src={"/post1.png"}
                    width={500}
                    height={500}
                    alt={"Verified icon"}
                />
            </div>
            <div className="flex mt-2 item-center">
                <Image
                    src={"/like.png"}
                    width={25}
                    height={25}
                    alt={"like icon"}
                    className="cursor-pointer"
                />
                <Image
                    src={"/comment.png"}
                    width={25}
                    height={25}
                    alt={"comment icon"}
                    className="ml-4 cursor-pointer"
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
            <div className="text-gray-500 mt-2 text-sm cursor-pointer">
                View all 13,384 comments
            </div>
            <div className="text-gray-800 mt-2 text-sm cursor-pointer">
                Add a comment…
            </div>
        </div>
    )
}