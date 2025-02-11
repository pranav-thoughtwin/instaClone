import { Button, TextField } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useApi from "../hooks/useApi";

interface filteredData {
    id: number,
    username: string
    email: string,
    fullName: string,
    bio: string,
    profilePicture: string,
}

export default function Search() {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState<filteredData[] | null>([]);
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
    const router = useRouter();
    const { apiCall } = useApi();

    const fetchResults = async (e: string) => {
        try {
            if (e) {
                const response = await apiCall({ url: `api/profile/name/${e}`, method: 'GET' })
                if (response.data.length > 0) {
                    const filteredResult = response.data.map((item: filteredData) => ({
                        id: item.id,
                        username: item.username,
                        name: item.fullName,
                        email: item.email
                    }));
                    setResult(filteredResult);
                }
                else {
                    setResult(null);
                }
            }
            else {
                setResult(null);
            }
        } catch (error) {
            console.log("Error fetchnig search results: ", error);
        }
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        const timeout = setTimeout(() => {
            fetchResults(e.target.value);
        }, 300);
        setDebounceTimeout(timeout);
    };


    const handleClick = async (item: filteredData) => {
        console.log("Item: ", item);
        const token = Cookie.get("token");
        console.log("Token: ", token);
        const response = await apiCall({
            url: `api/followRequest`, method: 'POST', data: {
                receiverId: item?.id
            }
        })
        console.log("Res: ", response);
        toast("Request send");
    }

    const handleProfileClick = (username: string) => {
        router.push(`/profile/${username}`);
    }

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
                        value={search}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="w-full border-t border-grey-500 mt-4"></div>
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="text-md">
                        Result
                    </div>
                    <div className="text-xs font-bold text-blue-500">
                        Clear all
                    </div>
                </div>
                <div className="mt-6 ml-2 overflow-y-auto h-80">
                    {result && result?.map((item, idx) => {
                        return (
                            <div key={idx} className="flex items-center mt-4">
                                <div className="flex items-center cursor-pointer" onClick={() => handleProfileClick(item?.username)}>
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
                                                {item?.username}
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
                                            {item?.fullName}
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-auto" onClick={() => handleClick(item)} >
                                    <Button size="small" variant="contained">Request</Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}