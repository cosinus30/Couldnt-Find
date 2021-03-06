import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
    CreateArticleRequest
} from '@internship/shared/types';

import { ArticleResponse, PageResponse, Tag } from './index'
import { isNullOrUndefined } from 'util';
import { CommentResponse } from './types';

export class ArticleResource {
    constructor(private axios: AxiosInstance = axiosStatic, private axiosRequestConfig: AxiosRequestConfig = {}) { }

    createArticle = (data: CreateArticleRequest): Promise<any> => this.axios.post("articles/", data, this.axiosRequestConfig).then((r) => r.data);

    updateArticle = (data: CreateArticleRequest, articleId: number): Promise<any> => this.axios.put("articles/?articleId=" + articleId , data, this.axiosRequestConfig).then((r) => r.data);

    removeArticle = (articleId: number): Promise<any> => this.axios.delete("articles/?articleId=" + articleId, this.axiosRequestConfig).then((r) => r.data);

    getArticles = (articleType: string, pageNo?: string, sortType?: string, size?: string, span?: string ): Promise<PageResponse> => {
        if(isNullOrUndefined(pageNo))
            pageNo="0";
        else{
            pageNo =  (Number.parseInt(pageNo) - 1).toString();
        }
        return this.axios.get('articles/'+ articleType + "?page=" + pageNo +"&sort=" +sortType + size + "&time=" + span, this.axiosRequestConfig)
        .then((response) => { return response.data })

    };

    getArticleById = (articleType: string, id: number) : Promise<ArticleResponse> => 
        this.axios.get("articles/"+ articleType + "/" + id, this.axiosRequestConfig)
        .then((response) => { return response.data });

    getSuggestions = (): Promise<Tag[]> => this.axios.get("articles/tags", this.axiosRequestConfig)
        .then((response) => {return response.data});

    unlike = (id: number): Promise<any> => this.axios.post("articles/" + id + "/unlike", this.axiosRequestConfig).then((response) => { return response });
    like = (id: number): Promise<any> => this.axios.post("articles/" + id + "/like", this.axiosRequestConfig).then((response) => { return response });

    unbookmark = (id: number): Promise<any> => this.axios.post("articles/" + id + "/unbookmark", this.axiosRequestConfig).then((response) => { return response });
    bookmark = (id: number): Promise<any> => this.axios.post("articles/" + id + "/bookmark", this.axiosRequestConfig).then((response) => { return response });

    getComments = (articleType:string, articleId: number) : Promise<CommentResponse[]> => this.axios.get("articles/" + articleType + "/" + articleId + "/comment", this.axiosRequestConfig).then((response) => { return response.data });
    
    makeComment = (articleType:string, articleId: number, content:string) : 
        Promise<any> => this.axios.post("articles/" + articleType + "/" + articleId + "/comment", {content}, this.axiosRequestConfig).then((response) => { return response.data });;

    updateComment = (articleType:string, articleId: number, content:string) : Promise<any> => this.axios.put("articles/" + articleType + "/" + articleId + "/comment", {content}, this.axiosRequestConfig);

    deleteComment = (articleType:string, articleId: number) : Promise<any> => this.axios.delete("articles/" + articleType + "/" + articleId + "/comment", this.axiosRequestConfig);

}