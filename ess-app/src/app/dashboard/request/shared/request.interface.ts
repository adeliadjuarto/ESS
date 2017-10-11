export interface IRequest {
    title: string;
    description: string;
    start: number;
    end: number;
    requestTypeId: number;
    userId: string;
    attachments: File[];
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
