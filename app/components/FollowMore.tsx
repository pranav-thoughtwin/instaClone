import { Dispatch, SetStateAction } from "react";

interface CaughtUpProps {
    setShowSearch: Dispatch<SetStateAction<boolean>>;
}

export default function FollowMore({ setShowSearch }: CaughtUpProps) {
    return (
        <div className="ml-40 mt-12 w-[450px] pb-6 justify-center text-center items-center">
            <p className="text-2xl font-semibold">Welcome to InstaClone!</p>
            <p className="text-gray-400 mt-2">It looks like you haven&apos;t followed anyone yet.</p>
            <p className="text-gray-400 mt-2">Start following people to see their posts and updates.</p>
            <div className="mt-4">
                <button onClick={() => setShowSearch(true)} className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                    Find People to Follow
                </button>
            </div>
        </div>
    )
}