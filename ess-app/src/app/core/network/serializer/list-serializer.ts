/**
 * Created by glenn on 11/16/16.
 */

import { ObjectSerializer } from './object-serializer';
import { Serializer } from './serializer.interface';

export class ListSerializer extends ObjectSerializer implements Serializer {

  constructor(template) {
    super(template);
  }

  serialize(input: ArrayBuffer): any {
    let json: any = this.jsonizer.serialize(input);
    let result: Array<any> = Array<any>();

    for (let i = 0, count = json.length; i < count; i++) {
      result.push(super.serialize(json[i]));
    }

    return result;
  }

}
