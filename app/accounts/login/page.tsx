'use client'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { toast } from "react-toastify";
import Cookie from 'js-cookie';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const errors = { username: '', password: '' };
            let valid = true;
            if (!username) {
                errors.username = "Username is required";
                valid = false;
            }
            if (!password) {
                errors.password = "Password is required";
                valid = false;
            }
            setErrors(errors);
            if (!valid) {
                return;
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
                email: username,
                password: password,
            });
            if (response) {
                toast(response.data.message);
            }
            const token = response.data.token;
            Cookie.set("token", token, { expires: 1, path: '/' });

            router.push('/');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast(error?.response?.data?.error);
            }
            else {
                toast("An unexpected error occured");
            }
        }
    }

    return (
        <div>
            <div className="border justify-center border-black-200 mt-4 flex flex-col w-96 mx-auto px-12">
                <Image
                    src="/insta.png"
                    width={200}
                    height={200}
                    alt="Insta logo"
                    className="mx-auto m-12"
                />
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="Phone number, username or email address"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setErrors((prev) => ({ ...prev, username: '' }))
                        }
                        }
                        error={!!errors.username}
                        helperText={errors.username}
                        slotProps={{
                            inputLabel: {
                                required: false,
                            },
                        }}
                        size="small"
                        fullWidth
                    />
                </div>
                <div className="mt-2 space-y-2">
                    <FormControl className="w-full" size="small" variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            value={password}
                            error={!!errors.password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors((prev) => ({ ...prev, password: '' }))
                            }}
                        />
                    </FormControl>
                    {errors.password && <span className="text-red-500 text-xs ml-3">{errors.password}</span>}
                </div>
                <div className="mt-3">
                    <Button onClick={handleLogin} variant="contained" fullWidth>Log in</Button>
                </div>
                <div className="flex mt-4 items-center space-x-2">
                    <div className="w-full border-t border-black-200"></div>
                    <span className="text-gray-500 text-sm font-bold">OR</span>
                    <div className="w-full border-t border-black-200"></div>
                </div>
                <div className="mx-auto mt-6 cursor-pointer">
                    <div className="items-center flex space-x-2">
                        <div>
                            <FaFacebook size={26} color="#1877F2" />
                        </div>
                        <div className="text-sm font-bold text-[#1877F2]">Log in with Facebook</div>
                    </div>
                </div>
                <div className="text-[#165EAB] text-sm mx-auto mt-3 mb-6 cursor-pointer">Forgotten your password?</div>
            </div>
            <div className="border border-black-200 items-center p-4 w-96 mx-auto mt-2 flex justify-center">
                Don&apos;t have an account? <span className="ml-1 font-bold text-[#1877F2] cursor-pointer"><Link href={"/accounts/signup"}>Sign up</Link></span>
            </div>
            <div className="">
                <div className="mx-auto w-fit my-4 text-sm font-semibold text-gray-800">Get the app</div>
                <div className="cursor-pointer">
                    <Image
                        src="/both.png"
                        width={300}
                        height={300}
                        alt="Insta logo"
                        className="mx-auto"
                    />
                </div>
                <div>
            </div>
            </div>
        </div>
    )
}
