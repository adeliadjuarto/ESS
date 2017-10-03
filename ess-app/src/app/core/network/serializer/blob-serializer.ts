/**
 * Created by glenn on 11/11/16.
 */

import { Serializer } from './serializer.interface';

export class BlobSerializer implements Serializer {

  public serialize(input: ArrayBuffer): any {
    return new Blob([input]);
  }

}
