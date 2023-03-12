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

  const getProjects = async ({
      page,
      pageSize,
      order,
      locale,
      orderBy,
      searchQuery
    }: {
      page: number;
      pageSize: number;
      order: string;
      locale: string;
      orderBy: string;
      searchQuery?: string;
    }
  ): Promise<IAllProjects> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.get(`/projects/all/${locale}/${page}/${pageSize}/${order}/${orderBy}?searchQuery=${searchQuery}`);

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { getProjects, loading };
};
