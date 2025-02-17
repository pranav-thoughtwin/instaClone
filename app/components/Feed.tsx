import Post from "./Post";
import Stories from "./Stories";
import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";

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

    const feedPostReq = async () => {
        const res = await apiCall({ url: 'api/feed', method: 'POST' });
        console.log("Feed Post response: ", res);        
    }

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
            <button className="p-2 bg-red-300 -mt-44" onClick={feedPostReq}>feed post req</button>

            {posts.map((postArray) => {
                return postArray.map((post, idx) => {
                    return <Post key={idx} data={post} />
                })
            })}
        </div>
    )
}