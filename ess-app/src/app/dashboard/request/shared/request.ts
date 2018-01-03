import { IRequest } from './request.interface';

export abstract class Request {

    protected abstract request: any;
    protected abstract submitRequest();
    protected abstract requestValid();
    protected abstract fileChange(event: any);
    protected abstract resetForm();
    protected abstract getPendingMessages();

}
