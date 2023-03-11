import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { GetPostResponse } from '@services/get-post/get-post.interface';

export const getPostService = () => {
  const getPost = async ({ slug, locale }: { slug: string; locale: string })
    : Promise<GetPostResponse> => {
    try {
      const { data } = await ApiClient.get(`/posts/get-post/${locale}/${slug}`);

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    }
  };

  return { getPost };
};
