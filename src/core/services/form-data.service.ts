import { HttpMethods } from '../enums';

export interface FormDataService {
  request(
    url: string,
    requestMethod: HttpMethods,
    request: any,
    token?: string
  ): Promise<any>;
}
