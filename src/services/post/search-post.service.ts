import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { IPost } from '@interfaces/post.interface';

export const useSearchPostService = () => {
  const [loading, setLoading] = React.useState(false);

  const searchPosts = async (
    { searchString }: { searchString: string }
  ): Promise<IPost[]> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.get(`/posts/search/${searchString}`);

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { searchPosts, loading };
};
