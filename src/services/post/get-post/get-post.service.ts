import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { GetPostResponse } from '@services/get-post/get-post.interface';

export const useGetPostService = () => {
  const [loading, setLoading] = React.useState(false);

  const getPost = async (slug: string)
    : Promise<GetPostResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.get(`/posts/get-post/${slug}`);

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { getPost, loading };
};
