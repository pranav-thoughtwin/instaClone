'use client'
import LeftsideBar from "./components/LeftsideBar";
import Feed from "./components/Feed";
import RightsideBar from "./components/RightsideBar";
import { useState } from "react";
import Search from "./components/Search";
import Notification from "./components/Notification";
import Create from "./components/Create";

export default function Home() {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="flex">
      <LeftsideBar
        setShowSearch={() => {
          setShowSearch((prev => !prev));
          setShowNotification(false);
          setShowCreate(false)
        }}
        setShowNotification={() => {
          setShowNotification((prev => !prev));
          setShowSearch(false);
          setShowCreate(false)
        }}
        setShowCreate={() => {
          setShowCreate((prev => !prev))
          setShowSearch(false);
          setShowNotification(false);
        }}
      />
      <Feed />
      {showSearch && <Search />}
      {showNotification && <Notification />}
      {showCreate && <Create showCreate={showCreate} setShowCreate={setShowCreate} />}
      <RightsideBar />
    </div>
  );
}
