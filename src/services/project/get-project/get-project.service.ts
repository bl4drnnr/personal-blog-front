import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { GetProjectResponse } from '@services/project/get-project/get-project.interface';

export const getProjectService = () => {
  const getProject = async ({ slug, locale }: { slug: string; locale: string })
    : Promise<GetProjectResponse> => {
    try {
      const { data } = await ApiClient.get(`/projects/get-project/${locale}/${slug}`);

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    }
  };

  return { getProject };
};
