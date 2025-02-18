export interface Post {
    id: number;
    userId?: number;
    imageUrl: string;
    caption: string;
    createdAt?: string;
    user?: {
        username: string;
        profilePicture: string
    };
}

export interface CommentsProps {
    open: boolean,
    setOpen: (value: boolean) => void
    data: Post
}

export interface Comment {
    id: number,
    postId: number,
    userId: number,
    content: string,
    createdAt: string
    user: {
        username: string,
        profilePicture: string
    }
}