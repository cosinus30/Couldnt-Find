export interface CreateArticleRequest {
    tags: string[];
    content: string;
    published: boolean;
    contentType: string;
    readTime: number;
    heading: string;
}