export interface ArticleResponse {
    content: string;
    published: boolean;
    releaseDate: Date;
    contentType: string;
    readTime: number;
    articleId: number;
    heading: string;
    author: string;
}