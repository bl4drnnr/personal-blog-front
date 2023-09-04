import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { Api } from '@api';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { page, pageSize, order, language, orderBy, searchQuery } = req.query;

    const requestLink = '/projects/all?' +
      `language=${language}&page=${page}&pageSize=${pageSize}&order=${order}&orderBy=${orderBy}&searchQuery=${searchQuery}`;

    const { data } = await Api.get(requestLink);

    return res.json(data);
  } catch (error: any) {
    return res
      .status((error as AxiosError).response?.status as number)
      .json((error as AxiosError).response?.data);
  }
};
