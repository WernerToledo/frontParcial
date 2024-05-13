export class JsonResponse {
    data?: any;
    message?: string;
    status?: string;
  
    constructor(data?: any, message?: string, status?: string) {
      this.data = data;
      this.message = message;
      this.status = status;
    }
}
