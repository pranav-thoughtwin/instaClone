'use client'
import Image from "next/image";
import axios from "axios"
import LeftsideBar from "./components/LeftsideBar";
import Feed from "./components/Feed";
import RightsideBar from "./components/RightsideBar";
import { useEffect, useState } from "react";
import Search from "./components/Search";
import Notification from "./components/Notification";

export default function Home() {
  const handleClick = async () => {
    const res = await axios.get('http://localhost:3000/api/hello');
    console.log(res);
  }
  const [showSearch, setShowSearch] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    console.log("Profile: ", profile);
  }, [profile]);

  return (
    <div className="flex">
      <LeftsideBar
        setShowSearch={() => {
          setShowSearch((prev => !prev));
          setShowNotification(false)
        }}
        setShowNotification={() => {
          setShowNotification((prev => !prev));
          setShowSearch(false);
        }}
      />
      <Feed />
      {showSearch && <Search />}
      {showNotification && <Notification />}
      <RightsideBar />
    </div>
  );
}
