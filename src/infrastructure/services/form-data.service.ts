import {
  FormDataService as FormDataServiceInterface,
  HttpMethods,
} from '../../core';
import axios from 'axios';
import FormData from 'form-data';

export class FormDataService implements FormDataServiceInterface {
  // TODO: define typed response model
  // TODO: consider injecting the client
  // TODO: unit tests
  async request(
    url: string,
    requestMethod: HttpMethods,
    request: any,
    token?: string
  ): Promise<any> {
    const formData = FormDataService.createFormData(request);
    const config = {
      method: requestMethod,
      url,
      headers: { ...formData.getHeaders() },
      data: formData,
    };

    if (token) {
      Object.assign(config.headers, { Authorization: token });
    }

    try {
      return await axios(config);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private static createFormData(request: any): FormData {
    const formData = new FormData();
    if (request) {
      Object.keys(request).forEach(key => formData.append(key, request[key]));
      return formData;
    } else {
      throw new Error('Invalid request. Request must contain at least one key');
    }
  }
}
