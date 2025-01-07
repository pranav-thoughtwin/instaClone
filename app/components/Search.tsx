import { TextField } from "@mui/material";
import Image from "next/image";

export default function () {
    const recent = ['ted', 'ted', 'ted', 'ted', 'ted',];
    return (
        <div className="border-l absolute top-0 left-16 w-96 h-[600px] shadow-lg rounded-2xl bg-white">
            <div className="p-6 pt-6">
                <div className="text-2xl font-medium">
                    Search
                </div>
                <div className="mt-8">
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Search"
                        type="search"
                        sx={{
                            backgroundColor: '#f0f0f0',
                            borderRadius: '8px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none',
                                },
                            },
                        }}
                    />
                </div>
            </div>
            <div className="w-full border-t border-grey-500 mt-4"></div>
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="text-md">
                        Recent
                    </div>
                    <div className="text-xs font-bold text-blue-500">
                        Clear all
                    </div>
                </div>
                <div className="mt-6 ml-2">
                    {recent.map((item, idx) => {
                        return (
                            <div key={idx} className="flex items-center mt-4">
                                <div>
                                    <Image
                                        src={"/tedLogo.png"}
                                        width={45}
                                        height={45}
                                        alt="ted logo"
                                        className="rounded-full border"
                                    />
                                </div>
                                <div className="text-xs ml-3">
                                    <div className="flex items-center">
                                        <div className="font-bold">
                                            ted
                                        </div>
                                        <div className="ml-2">
                                            <Image
                                                src={"/verified.png"}
                                                width={13}
                                                height={13}
                                                alt="verified logo"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-gray-500">
                                        TED Talks
                                    </div>
                                </div>
                                <div className="ml-auto cursor-pointer">
                                    <Image
                                        src={"/closeIcon.png"}
                                        width={15}
                                        height={15}
                                        alt="verified logo"
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}