import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from 'date-fns';
import { Box, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent } from "@mui/material";
import { toast } from "react-toastify";
import useApi from "../hooks/useApi";
import { DecodedToken } from "@/types";
interface FollowRequest {
    createdAt: Date
    id: number
    receiverId: number
    senderId: number
    status: string
    senderName?: string
}

interface NotificationProps {
    showNotification: boolean;
    setShowNotification: (value: boolean) => void;
}

export default function Notification({showNotification, setShowNotification}:NotificationProps) {
    const [requests, setRequests] = useState<FollowRequest[]>([]);
    const { apiCall } = useApi();

    const fetchRequests = async () => {
        try {
            const token = Cookie.get("token");
            let decodedToken: DecodedToken | null = null;
            if (token) {
                decodedToken = jwtDecode(token);
            }

            const response = await apiCall({ url: `api/followRequest/${decodedToken?.id}`, method: 'GET' });

            const dataPromises = response?.data?.map(async (item: FollowRequest) => {
                const userResponse = await apiCall({ url: `api/profile/id/${item.senderId}`, method: 'GET' })
                const status = item.status === 'pending' ? '' : item.status;
                return { ...item, senderName: userResponse?.data?.fullName, status };
            });

            const data = await Promise.all(dataPromises);
            setRequests(data);
        } catch (error) {
            console.log("Error fetching follow requests: ", error);
        }
    };

    const handleChange = async (ele: FollowRequest, event: SelectChangeEvent<string>) => {
        const newStatus = event.target.value as string;
        setRequests(prevRequests =>
            (prevRequests ?? []).map(request =>
                request.id === ele?.id ? { ...request, status: newStatus } : request
            )
        );
        const response = await apiCall({
            url: `api/followRequest/${ele?.id}`, method: 'PUT', data: {
                status: event.target.value,
                senderId: ele?.senderId,
                receiverId: ele?.receiverId
            }
        });
        if (response.status === 200) {
            toast("Status updated");
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleClose = () => {
        setShowNotification(false);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        outline: 'none',
        borderRadius: '16px'
    };

    return (
        <Modal
            open={showNotification}
            onClose={handleClose}
        >
            <Box sx={style}>
                <div className="">
                    <div className="p-6 pt-6">
                        <div className="text-2xl font-medium">
                            Notifications
                        </div>
                    </div>
                    <div className="pl-6">
                        <span className="font-semibold">Today</span>
                        {requests && requests.map((ele, idx) => {
                            return (
                                <div key={idx} className="mt-4 flex items-center w-full">
                                    <div className="flex items-center">
                                        <div>
                                            <Image
                                                src={"/dogIcon.png"}
                                                height={40}
                                                width={40}
                                                alt="Profile picture"
                                                className="rounded-full"
                                            />
                                        </div>
                                        <div className="text-xs ml-4">
                                            <div className="font-bold">
                                                {ele?.senderName}
                                            </div>
                                            <div>
                                                {
                                                    ele.status === "accepted" ?
                                                        "Started following you" :
                                                        (ele.status === "rejected") ? "Request rejected" : "Requested to follow you"
                                                }
                                                {/* Requested to follow you */}
                                                <div className="text-gray-500">
                                                    {formatDistanceToNow(new Date(ele?.createdAt))} ago
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2 ml-64">
                                        {ele.status === "accepted" ? <></> :
                                            <Box sx={{ minWidth: 100 }}>
                                                <FormControl size="small" fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Action</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={ele.status}
                                                        label="Action"
                                                        onChange={(event) => handleChange(ele, event)}
                                                    >
                                                        <MenuItem value={"accepted"}>Accept</MenuItem>
                                                        <MenuItem value={"rejected"}>Reject</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Box>
        </Modal>
    )
}