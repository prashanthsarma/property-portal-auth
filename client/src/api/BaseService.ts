import { AxiosError } from "axios";
import { default as axios } from 'axios';

export type MethodType = 'POST' | 'GET' | 'PUT' | 'DELETE';

export class BaseService {

  constructor() {

  }


  protected async callAPI(url: string, method: MethodType, body: any, headers: any) {
    try {
      const resp = await axios({
        headers,
        method,
        url,
      });
      return resp.data;
    }
    catch (e) {
      return this.handleError(e)
    }
  }

  protected handleError(e: AxiosError) {
    // handle error
    const err = e as AxiosError;
    if (err.response != null && err.response!.status === 401) {
      this.displayError("Login again")
      // Resend for a refresh token here and call the same api again
    }
    else {
      if (err.response != null) {
        this.displayError(`${err.response.data}`)
      }
      else {
        this.displayError(`${err.message}`)
      }
    }
  }

  protected displayError(message: string) {
    console.log(message);
  }
}