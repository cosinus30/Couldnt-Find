import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { isNullOrUndefined } from 'util';
import { PageResponse } from '../Article/index'

export class UserResource {
    constructor(private axios: AxiosInstance = axiosStatic, private axiosRequestConfig: AxiosRequestConfig = {}) { }

    getArticles = (articleType?: string, pageNo?: string): Promise<PageResponse> => {
        if(isNullOrUndefined(pageNo))
        pageNo="0";
        else{
        pageNo =  (Number.parseInt(pageNo) - 1).toString();
        }
        let axiosUrl = 'user/articles?page=' + pageNo;
        if(articleType)
            axiosUrl += "&articleType=" + articleType;

        return this.axios.get(axiosUrl, this.axiosRequestConfig)
            .then((response) => { return response.data })
    };
}