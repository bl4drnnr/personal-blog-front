import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { IPost } from '@interfaces/post.interface';

interface IAllPosts {
  rows: IPost[];
  count: number
}

export const useGetPostsService = () => {
  const [loading, setLoading] = React.useState(false);

  const getPosts = async ({
      page,
      pageSize,
      order,
      locale,
      orderBy,
      searchQuery,
      postTypes
    }: {
      page: number;
      pageSize: number;
      order: string;
      locale: string;
      orderBy: string;
      searchQuery?: string;
      postTypes?: string;
    }
  ): Promise<IAllPosts> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.get(`/posts/all/${locale}/${page}/${pageSize}/${order}/${orderBy}?searchQuery=${searchQuery || ''}&postTypes=${postTypes || ''}`);

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { getPosts, loading };
};
