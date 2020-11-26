export interface ArticleResponse {
    article: Article;
    liked: boolean;
    bookmarked: boolean;
}
export interface PageResponse{
    content: ArticlesResponse[];
    totalPages: number;
    last: boolean;
    totalElements: number;
    first:boolean;
    empty:boolean;
    number: number;
}

export interface CommentResponse{
    id: number;
    user: User;
    article: Article;
    content: string;
    commentDate: Date;
}
interface User {
    email: string;
    id: number;
    name: string;
    lastname: string;
    username: string
}
interface Article {
    content: string;
    published: boolean;
    releaseDate: Date;
    contentType: string;
    readTime: number;
    id: number;
    heading: string;
    author: User;
    bookmarkCount: number;
    likeCount: number;
    viewCount: number;
    commentCount: number;
    tags: Tag[];
}

interface ArticlesResponse {
    content: string;
    published: boolean;
    releaseDate: Date;
    contentType: string;
    readTime: number;
    id: number;
    heading: string;
    author: User;
    likeCount: number;
    bookmarkCount: number;
    viewCount: number;
    tags: Tag[];
}


export interface Tag{
    tagName: string;
}
