/**
 * Code clone by https://github.com/truongtrongtin/leave-tracker-api/tree/main
 */

import {
  IPaginationLinks,
  IPaginationMeta,
  IPaginationOptions,
} from './pagination.interfaces';

export class Pagination {
  public readonly data: any[];
  public readonly meta: IPaginationMeta;
  public readonly links?: IPaginationLinks;

  constructor(paginationOptions: IPaginationOptions) {
    const {
      data,
      totalItems,
      limit,
      currentPage,
      route,
      serviceId,
      functionId,
    } = paginationOptions;
    const totalPages = Math.ceil(totalItems / limit);
    const hasPreviousPage = currentPage > 1;
    const hasNextPage = currentPage < totalPages;
    const hasLastPage = totalPages > 0;

    this.data = data;

    this.meta = {
      current_page: currentPage,
      item_count: data.length,
      items_per_page: +limit,
      total_items: totalItems,
      total_pages: totalPages,
      service_id: serviceId,
      function_id: functionId,
      timestamp: Date.now(),
    };

    if (route) {
      this.links = {
        first: `${route}?limit=${limit}`,
        previous: hasPreviousPage
          ? `${route}?page=${currentPage - 1}&limit=${limit}`
          : '',
        next: hasNextPage
          ? `${route}?page=${currentPage + 1}&limit=${limit}`
          : '',
        last: hasLastPage ? `${route}?page=${totalPages}&limit=${limit}` : '',
      };
    }
  }
}
