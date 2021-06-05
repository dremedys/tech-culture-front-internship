export interface IUser{
    username: string,
    id: string
}
export interface IPost{
    id: number,
    comments_count: number,
    author: IUser,
    title: string,
    body:string,
    created_at: string,
    image: string
}
export interface IComment{
    id: number,
    post: IPost,
    likes_count: number,
    content: string,
    created_at: string,
    author: IUser
}
export interface Like {
    id: number,
    author: IUser,
    comment :Comment
}
export interface IProfile{
    id: number,
    user:IUser,
    description: string,
    avatar: string
}
export interface IToken{
    user_id:string,
    access:string,
    refresh: string
}
