import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { IProject } from '@interfaces/project.interface';

interface IAllProjects {
  rows: IProject[];
  count: number;
}

export const useGetProjectsService = () => {
  const [loading, setLoading] = React.useState(false);

  const getProjects = async (
    { page, pageSize, order }:
    { page: number, pageSize: number, order: string }
  ): Promise<IAllProjects> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.get(`/projects/all/${page}/${pageSize}/${order}`);

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { getProjects, loading };
};
