/**
 * Created by glenn on 11/11/16.
 */

export interface Serializer {

  serialize: (input: ArrayBuffer) => any;

}
