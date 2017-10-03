/**
 * Created by glenn on 11/9/16.
 */

import { Serializer } from './serializer/serializer.interface';
import { ResponseType } from './serializer/response-type.abstract';


export interface Response {

  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
  readonly headers: any;
  readonly content: any;
  readonly raw: any;

  to: (type: ResponseType|Serializer) => any;

}
