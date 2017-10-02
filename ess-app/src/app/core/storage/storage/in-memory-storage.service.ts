/**
 * Created by glenn on 6/10/17.
 */

import { GENERAL } from '../../constant/index';
import { currentTimestamp, startOf } from '../../utilities/datetime.utilities';
import { Storage, StorageObject } from './storage.interface';

export class InMemoryStorage extends Storage {

  protected container: any = {};

  public set(key: string, value: any, expiration: number = GENERAL.EXPIRATION) {
    if (key) {
      let object: StorageObject = { value, expiration: startOf(GENERAL.EXPIRATION_UNIT, expiration) };
      this.container[key] = this.serialize(object);
    }
  }

  public get(key: string): any {
    if (this.hasKey(key)) {
      let object: StorageObject = this.unserialize(this.container[key]);
      return object.value;
    }

    return null;
  }

  public delete(key: string) {
    delete this.container[key];
  }

  public hasKey(key: string): boolean {
    let raw: any = this.container[key];
    if (raw) {
      let object: StorageObject = this.unserialize(raw);
      if (object.expiration < currentTimestamp()) {
        this.delete(key);
      } else {
        return true;
      }
    }

    return false;
  }

  public clear() {
    this.container = {};
  }

}

