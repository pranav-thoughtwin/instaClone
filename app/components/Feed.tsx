import Post from "./Post";
import Stories from "./Stories";
import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import CaughtUp from "./CaughtUp";

interface PostProps {
    id: number;
    userId: number;
    imageUrl: string;
    caption: string;
    createdAt: string;
    user: {
        username: string;
        profilePicture: string
    };
}

export default function Feed() {
    const [posts, setPosts] = useState<PostProps[][]>([]);
    const { apiCall } = useApi();

    const fetchPosts = async () => {
        const response = await apiCall({ url: 'api/feed', method: 'GET' });
        return response.data;
    };

    useEffect(() => {
        const getPosts = async () => {
            const postsData = await fetchPosts();
            setPosts(postsData.posts);
        };
        getPosts();
    }, []);

    return (
        <div>
            <Stories />
            {posts.map((postArray) => {
                return postArray.map((post, idx) => {
                    return <Post key={idx} data={post} />
                })
            })}
            <CaughtUp />
        </div>
    )
}