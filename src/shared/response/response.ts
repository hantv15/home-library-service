// Local dependencies
import { IResponseMeta, IResponseOptions } from './response.interface';

export class Response {
  public readonly data: any;
  public readonly meta: IResponseMeta;

  constructor(responseOptions: IResponseOptions) {
    const { data, serviceId, functionId } = responseOptions;

    this.data = data;

    this.meta = {
      service_id: serviceId,
      function_id: functionId,
      timestamp: Date.now(),
    };
  }
}
