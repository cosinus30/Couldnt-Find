import { AuthResource } from './Auth/auth-resource';
import axios from '../config/axios';
import { ArticleResource } from './Article/article-resource';
import { UserResource } from './User';

export const api = {
  auth: new AuthResource(axios),
  article: new ArticleResource(axios),
  user: new UserResource(axios),
};
