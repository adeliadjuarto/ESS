export interface IRequest {
    title: string;
    description: string;
    requestTypeId: number;
    userId: string;
    'attachments[]': File[];
}

export interface Leave extends IRequest {
    start: number;
    end: number;
}

export interface Reimbursement extends IRequest {
    eventDate: number;
    amount: number;
}

export interface Overtime extends IRequest {
    eventDate: number;
    startTime: number;
    endTime: number;
}

export class FormRequest {
    constructor(private title: string,
                private description: string,
                private start: number,
                private end: number,
                private requestTypeId: number,
                private userId: string,
                private attachments: File[]
    ) {}
}
