'use client'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaFacebookSquare } from "react-icons/fa";
import { toast } from 'react-toastify';
import Cookie from 'js-cookie';

export default function Signup() {
    const [numberOrEmail, setNumberOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [errors, setErrors] = useState({ numberOrEmail: '', password: '', fullName: '', username: '' });
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSignup = async () => {
        try {
            const validateEmail = (email: string) => {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            };

            const validateMobileNumber = (number: string) => {
                const re = /^\+?[1-9]\d{9,14}$/;
                return re.test(number);
            };

            const validateStrongPassword = (password: string) => {
                const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                return re.test(password);
            };

            const errors = { numberOrEmail: '', password: '', fullName: '', username: '' };
            let valid = true;
            if (!username) {
                errors.username = "Username is required";
                valid = false;
            }
            if (!password) {
                errors.password = "Password is required";
                valid = false;
            } else if (!validateStrongPassword(password)) {
                errors.password = "Password must be 8 characters long, include uppercase & lowercase letter, number, and special character";
                valid = false;
            }
            if (!numberOrEmail) {
                errors.numberOrEmail = "Mobile number or email is required";
                valid = false;
            }
            if (!numberOrEmail) {
                errors.numberOrEmail = "Mobile number or email is required";
                valid = false;
            } else if (!validateEmail(numberOrEmail) && !validateMobileNumber(numberOrEmail)) {
                errors.numberOrEmail = "Please enter a valid mobile number or email";
                valid = false;
            }
            if (!fullName || fullName.trim().length === 0) {
                errors.fullName = "Full name is required";
                valid = false;
            }
            setErrors(errors);

            if (!valid) {
                return;
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`, {
                username: username,
                email: numberOrEmail,
                password: password,
                fullName: fullName.trim()
            });

            if (response) {
                // toast(response.data.message);
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
            <div className="border justify-center border-black-200 my-4 flex flex-col w-96 mx-auto px-12">
                <Image
                    src="/insta.png"
                    width={200}
                    height={200}
                    alt="Insta logo"
                    className="mx-auto m-10"
                />
                <div className="font-bold text-gray-500 -mt-8 text-sm text-center">
                    Sign up to see photos and videos from your friends.
                </div>
                <div className="mt-3">
                    <Button variant="contained" fullWidth startIcon={<FaFacebookSquare />}>Log in with facebook</Button>

                    <button className="hover:bg-gray-300 bg-gray-200 rounded-md w-full p-[6px] m-2 mx-auto text-sm font-bold">Use QR code</button>
                </div>
                <div className="flex my-2 items-center space-x-2">
                    <div className="w-full border-t border-black-200"></div>
                    <span className="text-gray-500 text-sm font-bold">OR</span>
                    <div className="w-full border-t border-black-200"></div>
                </div>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="Email address"
                        value={numberOrEmail}
                        onChange={(e) => {
                            setNumberOrEmail(e.target.value.trim());
                            setErrors((prev) => ({ ...prev, numberOrEmail: '' }))
                        }
                        }
                        error={!!errors.numberOrEmail}
                        helperText={errors.numberOrEmail}
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
                                        onClick={() => setShowPassword((show) => !show)}
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
                                setPassword(e.target.value.trim());
                                setErrors((prev) => ({ ...prev, password: '' }))
                            }}
                        />
                    </FormControl>
                    {errors.password && <span className="text-red-500 text-xs ml-3">{errors.password}</span>}
                </div>
                <div className="mt-2">
                    <TextField
                        required
                        value={fullName}
                        error={!!errors.fullName}
                        helperText={errors.fullName}
                        onChange={(e) => {
                            setFullName(e.target.value);
                            setErrors((prev) => ({ ...prev, fullName: '' }))
                        }}
                        id="outlined-required"
                        label="Full Name"
                        slotProps={{
                            inputLabel: {
                                required: false,
                            },
                        }}
                        size="small"
                        className="mt-2"
                        fullWidth
                    />
                </div>
                <div className="mt-2">
                    <TextField
                        required
                        value={username}
                        error={!!errors.username}
                        helperText={errors.username}
                        onChange={(e) => {
                            setUsername(e.target.value.trim());
                            setErrors((prev) => ({ ...prev, username: '' }))
                        }}
                        id="outlined-required"
                        label="Username"
                        slotProps={{
                            inputLabel: {
                                required: false,
                            },
                        }}
                        size="small"
                        className="mt-2"
                        fullWidth
                    />
                </div>
                <div className="text-xs text-gray-500 mt-3 text-center">
                    People who use our service may have uploaded your contact information to Instagram. <span className="font-bold text-[#1877F2] cursor-pointer">Learn more</span>
                </div>
                <div className="text-xs text-gray-500 mt-3 text-center">
                    By signing up, you agree to our <span className="font-bold text-[#1877F2] cursor-pointer">Terms, Privacy Policy </span>and<span className="font-bold text-[#1877F2] cursor-pointer"> Cookies Policy</span>.
                </div>

                <div className="mt-3 mb-4">
                    <Button onClick={handleSignup} variant="contained" fullWidth>Sign Up</Button>
                </div>
            </div>
        </div>
    )
}