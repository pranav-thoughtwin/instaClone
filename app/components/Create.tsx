import { Box, Button, Modal } from "@mui/material";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";
import { useState } from "react";
import { toast } from "react-toastify";
import useApi from "../hooks/useApi";

interface CreateProp {
    showCreate: boolean;
    setShowCreate: (arg: boolean) => void;
}

const Create = ({ showCreate, setShowCreate }: CreateProp) => {
    const [base64URL, setBase64URL] = useState<string | null>(null);
    const { apiCall } = useApi();

    const handleClose = () => setShowCreate(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            convertToBase64(file);
        }
    };

    const convertToBase64 = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setBase64URL(reader.result as string);
        };
    };

    const handleUpload = async () => {
        if (base64URL) {
            try {
                const response = await apiCall({
                    url: `api/post`, method: 'POST', data: {
                        imageUrl: base64URL,
                        caption: "Test caption"
                    }
                })
                if (response?.status === 200) {
                    toast("Post uploaded");
                    window.location.reload();
                    handleClose();
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        outline: 'none',
        borderRadius: '16px'
    };

    return (
        <div>
            <Modal
                open={showCreate}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <div className="">
                        <div className="flex items-center">
                            <div className="mx-auto w-fit m-2 flex items-center">
                                <div className="text-lg">
                                    Create new post
                                </div>
                            </div>
                            <div onClick={handleClose} className="mr-4 cursor-pointer">
                                <FaXmark />
                            </div>
                        </div>
                        <div className="border-t border-gray-300"></div>
                        <div className="items-center justify-center flex">
                            <div className="mt-14">
                                <div className="mt-4 w-fit mx-auto">
                                    <Image
                                        src={"/upload.png"}
                                        height={80}
                                        width={80}
                                        alt="Upload icon"
                                    />
                                </div>
                                <div className="mt-4 text-2xl w-fit mx-auto">
                                    Drag photos and videos here
                                </div>
                                <div className="mt-4 w-fit mx-auto">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="upload-input"
                                        onChange={handleFileChange}
                                    />
                                    {base64URL ?
                                        <div className="w-fit mx-auto">
                                            <Button size="small" variant="contained" onClick={handleUpload}>
                                                Upload
                                            </Button>
                                        </div> : <label htmlFor="upload-input">
                                            <Button size="small" variant="contained" component="span">
                                                Select from computer
                                            </Button>
                                        </label>
                                    }
                                </div>
                                {base64URL && (
                                    <div className="mt-4">
                                        <Image
                                            src={base64URL}
                                            height={80}
                                            width={80}
                                            alt="Selected image"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Create;