import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
    CreateArticleRequest
} from '@internship/shared/types';

import { ArticleResponse } from './index'

export class ArticleResource {
    constructor(private axios: AxiosInstance = axiosStatic, private axiosRequestConfig: AxiosRequestConfig = {}) { }

    createArticle = (data: CreateArticleRequest): Promise<any> => this.axios.post("articles/", data, this.axiosRequestConfig).then((r) => r.data);
    getTutorials = (): Promise<ArticleResponse[]> => {
        return this.axios.get('articles/tutorials', this.axiosRequestConfig).then((response) => { return response.data })
    };
    getInsights = (): Promise<ArticleResponse[]> => {
        return this.axios.get('articles/insights', this.axiosRequestConfig).then((response) => { return response.data })
    };
    getEngineerings = (): Promise<ArticleResponse[]> => {
        return this.axios.get('articles/engineerings', this.axiosRequestConfig).then((response) => { return response.data })
    };

    getTutorialById = (id: number): Promise<ArticleResponse> => this.axios.get("articles/tutorials/" + id, this.axiosRequestConfig).then((response) => { return response.data });
    // updateArticle = ();

}