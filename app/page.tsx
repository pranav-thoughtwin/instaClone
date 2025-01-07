'use client'
import LeftsideBar from "./components/LeftsideBar";
import Feed from "./components/Feed";
import RightsideBar from "./components/RightsideBar";
import { useState } from "react";
import Search from "./components/Search";
import Notification from "./components/Notification";

export default function Home() {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

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
