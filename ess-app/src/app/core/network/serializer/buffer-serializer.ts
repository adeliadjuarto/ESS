/**
 * Created by glenn on 11/11/16.
 */

import { Serializer } from './serializer.interface';

export class BufferSerializer implements Serializer {

  public serialize(input: ArrayBuffer): any {
    return input;
  }

}
