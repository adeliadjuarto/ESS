/**
 * Created by glenn on 11/11/16.
 */

import { Serializer } from './serializer.interface';
import { ResponseType } from './response-type.abstract';

export class CompoundSerializer implements Serializer {

  private serializers: Array<Serializer> = [
    ResponseType.Json,
    ResponseType.Blob,
    ResponseType.Text,
    ResponseType.ArrayBuffer
  ];

  public serialize(input: ArrayBuffer): any {
    let result: any = undefined;
    for (let i = 0, count = this.serializers.length; i < count; i++) {
      try {
        result = this.serializers[i].serialize(input);
      } catch (ex) {
        continue;
      }

      break;
    }
    return result;
  }

}
