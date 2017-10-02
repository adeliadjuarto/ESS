/**
 * Created by glenn on 11/11/16.
 */

import { Serializer } from './serializer.interface';
import { TextSerializer } from './text-serializer';

export class JsonSerializer implements Serializer {

  private textSerializer: Serializer = new TextSerializer();

  public serialize(input: ArrayBuffer): any {
    let text: string = this.textSerializer.serialize(input);

    try {
      return JSON.parse(text);
    } catch (error) {
      return null;
    }
  }

}
