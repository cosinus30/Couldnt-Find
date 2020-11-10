import { AuthResource } from './Auth/auth-resource';
import axios from '../config/axios';
import { ArticleResource } from './Article/article-resource';

export const api = {
  auth: new AuthResource(axios),
  article: new ArticleResource(axios),
};
