import { Response as AngularResponse } from '@angular/http';

import { Response } from './response.interface';
import { ResponseType } from './serializer/response-type.abstract';
import { Serializer } from './serializer/serializer.interface';
import { CompoundSerializer } from './serializer/compound-serializer';

export class HttpResponse implements Response {

    private response: any;

    protected serializer: Serializer = new CompoundSerializer();

    public get content(): any {
        return this.serializer.serialize(this.raw);
    }

    public get ok(): boolean {
        return this.response.ok;
    }

    public get url(): string {
        return this.response.url;
    }

    public get status(): number {
        return this.response.status;
    }

    public get statusText(): string {
        return this.response.status.toString();
    }

    public get headers(): any {
        return this.response.headers.toJSON();
    }

    public get raw(): any {
        return this.response && this.response.arrayBuffer ? this.response.arrayBuffer() : null;
    }

    constructor(response: AngularResponse) {
      this.response = response;
    };

    public to(type: ResponseType | Serializer) {
        return type.serialize(this.raw);
    }

}
