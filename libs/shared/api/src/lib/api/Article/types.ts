export interface ArticleResponse {
    article: Article;
    liked: boolean;
    bookmarked: boolean;
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
}

export interface ArticlesResponse {
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
}