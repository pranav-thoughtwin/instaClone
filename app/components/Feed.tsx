import Post from "./Post";
import Stories from "./Stories";

export default function Feed() {
    const posts = ['post', 'post', 'post']
    return (
        <div>
            <Stories />
            <div className="mt-8">
                <Post />
            </div>
            {posts.map((item, idx) => {
                return (
                    <div key={idx}>
                        <Post />
                    </div>
                )
            })}
        </div>
    )
}