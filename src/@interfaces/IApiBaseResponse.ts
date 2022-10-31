import HttpStatusCodes from '../@enums/HttpStatusCodes';

interface IApiBaseResponse {
  status: HttpStatusCodes;
  success: boolean;
  requestId: string;
  data?: any;
  errors?: Array<string>;
}

export default IApiBaseResponse;
