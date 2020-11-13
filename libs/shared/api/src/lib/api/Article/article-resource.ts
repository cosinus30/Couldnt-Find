import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
    CreateArticleRequest
} from '@internship/shared/types';

import { ArticleResponse, PageResponse } from './index'
import { isNullOrUndefined } from 'util';

export class ArticleResource {
    constructor(private axios: AxiosInstance = axiosStatic, private axiosRequestConfig: AxiosRequestConfig = {}) { }

    createArticle = (data: CreateArticleRequest): Promise<any> => this.axios.post("articles/", data, this.axiosRequestConfig).then((r) => r.data);

    getArticles = (articleType: string, pageNo?: string, sortType?: string): Promise<PageResponse> => {
        if(isNullOrUndefined(pageNo))
            pageNo="0";
        else{
            pageNo =  (Number.parseInt(pageNo) - 1).toString();
        }
        return this.axios.get('articles/'+ articleType + "?page=" + pageNo +"&" + sortType, this.axiosRequestConfig)
        .then((response) => { return response.data })

    };

    getArticleById = (articleType: string, id: number) : Promise<ArticleResponse> => 
        this.axios.get("articles/"+ articleType + "/" + id, this.axiosRequestConfig)
        .then((response) => { return response.data });

    unlike = (id: number): Promise<any> => this.axios.post("articles/" + id + "/unlike", this.axiosRequestConfig).then((response) => { return response });
    like = (id: number): Promise<any> => this.axios.post("articles/" + id + "/like", this.axiosRequestConfig).then((response) => { return response });

    unbookmark = (id: number): Promise<any> => this.axios.post("articles/" + id + "/unbookmark", this.axiosRequestConfig).then((response) => { return response });
    bookmark = (id: number): Promise<any> => this.axios.post("articles/" + id + "/bookmark", this.axiosRequestConfig).then((response) => { return response });


}