/**
 * Code clone by https://github.com/truongtrongtin/leave-tracker-api/tree/main
 */

export interface IPaginationOptions {
  data: any;
  totalItems: number;
  limit: number;
  currentPage: number;
  serviceId: string;
  functionId: string;
  route?: string;
}

export interface IPaginationMeta {
  /**
   * the amount of items on this specific page
   */
  item_count: number;

  /**
   * the total amount of items
   */
  total_items: number;

  /**
   * the amount of items that were requested per page
   */
  items_per_page: number;

  /**
   * the total amount of pages in this paginator
   */
  total_pages: number;

  /**
   * the current page this paginator "points" to
   */
  current_page: number;

  /**
   * the current page this paginator service run
   */
  service_id: string;

  /**
   * the current page this paginator function run
   */
  function_id: string;

  timestamp: number;
}

export interface IPaginationLinks {
  /**
   * a link to the "first" page
   */
  first?: string;
  /**
   * a link to the "previous" page
   */
  previous?: string;
  /**
   * a link to the "next" page
   */
  next?: string;
  /**
   * a link to the "last" page
   */
  last?: string;
}
