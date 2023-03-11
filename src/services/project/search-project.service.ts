import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { IProject } from '@interfaces/project.interface';

export const useSearchProjectService = () => {
  const [loading, setLoading] = React.useState(false);

  const searchProjects = async (
    { searchString }: { searchString: string }
  ): Promise<IProject[]> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.get(`/projects/search/${searchString}`);

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { searchProjects, loading };
};
