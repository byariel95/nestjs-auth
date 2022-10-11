import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

type IMessage = 'Error' | 'Success';
export interface IResponse {
  status: boolean;
  statusCode: number;
  message: string | IMessage;
  data: any;
}

@Injectable()
export class ResponseData {

  public resultResponse(code: HttpStatus, message: IMessage | string, data: string | Object): IResponse {

    // build json to return
    const response: IResponse = {
      status: code < 400 ? true : false,
      statusCode: code,
      message,
      data
    };
    return response;
  }

  public resultError(code: HttpStatus, message: IMessage | string, data: string | Object): IResponse {
    // build json to return
    const response: IResponse = {
      status: code < 400 ? true : false,
      statusCode: code,
      message,
      data
    };
    throw new HttpException(response, response.statusCode);
  }


}