import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { Api } from '@api';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { page, pageSize, order, locale, orderBy, searchQuery, postTypes } = req.query;
    const { data } = await Api.get(
      `/posts/all/${locale}/${page}/${pageSize}/${order}/${orderBy}?searchQuery=${searchQuery}&postTypes=${postTypes}`
    );

    return res.json(data);
  } catch (error: any) {
    return res
      .status((error as AxiosError).response?.status as number)
      .json((error as AxiosError).response?.data);
  }
};
