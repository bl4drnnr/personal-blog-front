import { OrderBy } from '@custom-types/order-by.type';
import { Order } from '@custom-types/order.type';

export interface IInitFetchProjects {
  q: string;
  o: Order;
  oBy: OrderBy;
}
