import { IRequest } from './request.interface';

export abstract class RequestClass {

    protected abstract request: any;
    protected abstract userId: string;
    protected abstract requestConfirm: boolean;
    protected abstract errorMessage: string;
    protected abstract pendingRequests: number;
    protected abstract fileName: string;

    protected abstract confirmRequest();
    protected abstract submitRequest();
    protected abstract requestValid();
    protected abstract fileChange(event: any);
    protected abstract resetForm();
    protected abstract getPendingMessages();

}
