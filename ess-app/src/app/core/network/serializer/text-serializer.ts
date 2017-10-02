/**
 * Created by glenn on 11/11/16.
 */

import { TextDecoder } from 'text-encoding';

import { Serializer } from './serializer.interface';

export class TextSerializer implements Serializer {

  private decoder: TextDecoder = new TextDecoder();

  public serialize(input: ArrayBuffer): any {
    return this.decoder.decode(new Uint8Array(input));
  }

}
