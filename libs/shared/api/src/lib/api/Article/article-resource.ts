import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
    CreateArticleRequest
} from '@internship/shared/types';

import { ArticleResponse, ArticlesResponse } from './index'

export class ArticleResource {
    constructor(private axios: AxiosInstance = axiosStatic, private axiosRequestConfig: AxiosRequestConfig = {}) { }

    createArticle = (data: CreateArticleRequest): Promise<any> => this.axios.post("articles/", data, this.axiosRequestConfig).then((r) => r.data);
    getTutorials = (): Promise<ArticlesResponse[]> => {
        return this.axios.get('articles/tutorials', this.axiosRequestConfig).then((response) => { return response.data })
    };
    getInsights = (): Promise<ArticlesResponse[]> => {
        return this.axios.get('articles/insights', this.axiosRequestConfig).then((response) => { return response.data })
    };
    getEngineerings = (): Promise<ArticlesResponse[]> => {
        return this.axios.get('articles/engineerings', this.axiosRequestConfig).then((response) => { return response.data })
    };

    getTutorialById = (id: number): Promise<ArticleResponse> => this.axios.get("articles/tutorials/" + id, this.axiosRequestConfig).then((response) => { return response.data });
    getInsightById = (id: number): Promise<ArticleResponse> => this.axios.get("articles/insights/" + id, this.axiosRequestConfig).then((response) => { return response.data });
    getEngineeringById = (id: number): Promise<ArticleResponse> => this.axios.get("articles/engineerings/" + id, this.axiosRequestConfig).then((response) => { return response.data });

    unlike = (id: number): Promise<any> => this.axios.post("articles/" + id + "/unlike", this.axiosRequestConfig).then((response) => { return response });
    like = (id: number): Promise<any> => this.axios.post("articles/" + id + "/like", this.axiosRequestConfig).then((response) => { return response });

    unbookmark = (id: number): Promise<any> => this.axios.post("articles/" + id + "/unbookmark", this.axiosRequestConfig).then((response) => { return response });
    bookmark = (id: number): Promise<any> => this.axios.post("articles/" + id + "/bookmark", this.axiosRequestConfig).then((response) => { return response });


}