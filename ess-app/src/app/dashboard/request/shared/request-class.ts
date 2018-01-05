import { IRequest } from './request.interface';

export abstract class RequestClass {

    protected abstract request: any;
    protected abstract submitRequest();
    protected abstract requestValid();
    protected abstract fileChange(event: any);
    protected abstract resetForm();
    protected abstract getPendingMessages();

}
