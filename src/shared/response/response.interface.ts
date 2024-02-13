export interface IResponseOptions {
  data: any;
  serviceId: string;
  functionId: string;
  route?: string;
}

export interface IResponseMeta {
  /**
   * the current service run
   */
  service_id: string;

  /**
   * the current function run
   */
  function_id: string;

  /**
   * the current timestamp run
   */
  timestamp: number;
}
