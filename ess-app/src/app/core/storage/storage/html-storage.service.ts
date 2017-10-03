/**
 * Created by glenn on 7/25/17.
 */

import { GENERAL } from '../../constant/index';
import { currentTimestamp, startOf } from '../../utilities/datetime.utilities';
import { Storage, StorageObject } from './storage.interface';

export abstract class HtmlStorage extends Storage {

  constructor(protected container: any = null) {
    super();
  }

  public set(key: string, value: any, expiration: number = GENERAL.EXPIRATION) {
    if (key) {
      let object: StorageObject = { value, expiration: startOf(GENERAL.EXPIRATION_UNIT, expiration) };
      this.container.setItem(key, this.serialize(object));
    }
  }

  public get(key: string): any {
    if (this.hasKey(key)) {
      let object: StorageObject = this.unserialize(localStorage.getItem(key));
      return object.value;
    }

    return null;
  }

  public delete(key: string) {
    this.container.removeItem(key);
  }

  public hasKey(key: string): boolean {
    let raw: any = localStorage.getItem(key);
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
    this.container.clear();
  }

}
