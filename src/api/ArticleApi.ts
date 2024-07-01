import axios, { AxiosResponse } from 'axios';
import { Article } from '../types/Article';

// Base URL for the API
const BASE_URL = 'http://localhost:3000';

// Create Axios instance with base URL
const api = axios.create({
  baseURL: BASE_URL,
});

// Function to fetch articles by category from the API
export const getArticleByCategory = async (category: string): Promise<Article[]> => {
  const response: AxiosResponse<Article[]> = await api.get('/article/category', {
    params: {
      category: category,
    },
  });
  return response.data;
};

// Function to fetch an article by its ID from the API
export const getArticleById = async (id: number): Promise<Article> => {
  const response: AxiosResponse<Article> = await api.get(`/article/${id}`);
  return response.data;
};
