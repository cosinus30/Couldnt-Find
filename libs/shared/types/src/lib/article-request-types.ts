export interface CreateArticleRequest {
    content: string;
    published: boolean;
    contentType: string;
    readTime: number;
    heading: string;
}