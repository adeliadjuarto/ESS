import { Injectable, Type } from '@angular/core';

import { GENERAL } from '../../../constant/index';
import { CookieStorage } from '../../../storage/storage/cookie-storage.service';
import { Token } from './token.model';

@Injectable()
export class TokenService {

  constructor(protected storage: CookieStorage) { }

  public store<T extends Token>(name: string, token: T): void {
    this.storage.set(name, this.serialize(token), token.expiration);
  }

  public retrieve<T extends Token>(name: string, type: Type<T>): T {
    let raw: string = this.storage.get(name);
    let result: any = this.unserialize(raw);
    return result !== null ? Object.assign(new type(), result) : null;
  }

  public exists(name: string): boolean {
    return this.storage.hasKey(name);
  }

  public remove(name: string) {
    this.storage.set(name, null, -10 * GENERAL.EXPIRATION);
    this.storage.delete(name);
  }

  protected serialize(token: Token): string {
    return btoa(JSON.stringify(token));
  }

  protected unserialize(raw: string): any {
    try {
      return JSON.parse(atob(raw));
    } catch (e) {
      return null;
    }
  }

}
