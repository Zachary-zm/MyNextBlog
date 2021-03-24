// import { AxiosResponse}  from 'axios';
import fetch from '../utils/fetch';

export const getPosts = params => {
    return fetch({
      method: 'get',
      url: '/api/posts',
      params,
    });
};

export const getCategories = () => {
    return fetch({
      method: 'get',
      url: '/api/categories',
    });
};

export const getSettings = () => {
  return fetch({
    method: 'get',
    url: '/api/settings',
  });
};

export const getProfile = () => {
  return fetch({
    method: 'get',
    url: '/api/profile',
  });
};

export const getArticle = (params) => {
  return fetch({
    method: 'get',
    url: '/api/article',
    params
  });
};

export const getpostsCountByCate = (params) => {
  return fetch({
    method: 'get',
    url: '/api/postsCountByCate',
    params
  });
};