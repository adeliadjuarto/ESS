/**
 * Created by glenn on 11/16/16.
 */

import { Serializer } from './serializer.interface';
import { ResponseType } from './response-type.abstract';

export class ObjectSerializer implements Serializer {

  protected jsonizer: Serializer = ResponseType.Json;

  public static of(type): Serializer {
    return new this(type);
  }

  constructor(private template) { }

  serialize(input: ArrayBuffer): any {
    let json: any = this.jsonizer.serialize(input);

    if (json) {
      let result: any = new this.template();

      Object.assign(result, json);
      return result;
    }

    return json;
  }

}
