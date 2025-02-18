export interface User {
    id: number,
    username: string,
    email: string,
    password: string,
    fullName: string,
    bio: string,
    profilePicture: string,
    createdAt: Date
}

export interface Follower {
    id: number,
    followerId: number,
    followeeId: number,
    createdAt: Date,
    follower: {
        username: string,
        profilePicture: string,
        fullName: string
    }
}
export interface Followee {
    id: number,
    followerId: number,
    followeeId: number,
    createdAt: Date,
    followee: {
        username: string
        profilePicture: string,
        fullName: string
    }
}
// export interface Post {
//     id: number,
//     caption: string,
//     imageUrl: string
// }
