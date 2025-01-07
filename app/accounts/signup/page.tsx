'use client'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaFacebookSquare } from "react-icons/fa";

export default function Signup() {
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [errors, setErrors] = useState({ number: '', password: '', fullName: '', username: '' });
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSignup = () => {
        const errors = { number: '', password: '', fullName: '', username: '' };
        let valid = true;
        if (!username) {
            console.log("hit");

            errors.username = "Username is required";
            valid = false;
        }
        if (!password) {
            errors.password = "Password is required";
            valid = false;
        }
        if (!number) {
            errors.number = "Mobile number or email is required";
            valid = false;
        }
        if (!fullName) {
            errors.fullName = "Full name is required";
            valid = false;
        }
        setErrors(errors);
        if (!valid) {
            return;
        }
        router.push('/');
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
                        label="Mobile number or email address"
                        value={number}
                        onChange={(e) => {
                            setNumber(e.target.value);
                            setErrors((prev) => ({ ...prev, number: '' }))
                        }
                        }
                        error={!!errors.number}
                        helperText={errors.number}
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
                            setUsername(e.target.value);
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