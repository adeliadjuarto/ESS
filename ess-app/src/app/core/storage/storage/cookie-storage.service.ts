/**
 * Created by glenn on 6/10/17.
 */

import { Cookie } from 'ng2-cookies';

import { GENERAL, PATH } from '../../constant/index';
import { Storage } from './storage.interface';
import { startOf } from '../../utilities/datetime.utilities';

export class CookieStorage extends Storage {

  public set(key: string, value: any, expiration: number = GENERAL.EXPIRATION) {
    if (key) {
      Cookie.set(key, this.serialize(value), new Date(startOf(GENERAL.EXPIRATION_UNIT, expiration) * 1000), PATH.ROOT);
    }
  }

  public get(key: string): any {
    return this.unserialize(Cookie.get(key));
  }

  public delete(key: string) {
    Cookie.delete(key);
  }

  public hasKey(key: string) {
    return Cookie.check(key);
  }

  public clear() {
    Cookie.deleteAll();
  }

}

