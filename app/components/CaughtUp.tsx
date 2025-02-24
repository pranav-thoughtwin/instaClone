import Image from "next/image";

export default function CaughtUp() {
    return (
        <div className="ml-40 mt-12 w-[450px] pb-6 justify-center items-center">
            <div className="flex">
                <div className="border-2 h-fit items-center border-b-0 border-r-0 border-l-0  border-gray-300 w-full bg-red pb-4"></div>
                <div className="border-t-2 border-b-0 border-r-0 border-l-0"></div>
                <div className="-mt-3">
                    <Image
                        src={"/caughtUp.png"}
                        height={120}
                        width={120}
                        alt="caughtUp"
                    />
                </div>
                <div className="border-2 border-b-0 border-r-0 border-l-0  border-gray-300 w-full bg-red pb-4"></div>
            </div>
            <div className="text-center">
                <p className="text-2xl">You&apos;re All Caught Up</p>
                <p className="text-gray-400">You&apos;ve seen all new post from past. Follow more people to see more posts</p>
            </div>
        </div>
    )
}