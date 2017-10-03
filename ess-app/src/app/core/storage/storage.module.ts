/**
 * Created by glenn on 6/10/17.
 */

import { NgModule } from '@angular/core';

import { CookieStorage, InMemoryStorage, LocalStorage, SessionStorage } from './storage/index';
import { Storage } from './storage/storage.interface';

export function storageFactory(): Storage {
  const key: string = `__KEY_${Math.random().toString(36).substring(2)}__`;
  let storage: Storage = new InMemoryStorage();

  if (typeof Storage !== 'undefined') {
    storage = new LocalStorage();
    try {
      storage.set(key, Math.random().toString(36).substring(2));
    } catch (e) {
      storage = new InMemoryStorage();
    } finally {
      storage.delete(key);
    }
  }

  return storage;
}


@NgModule({
  declarations: [],
  providers: [
    CookieStorage,
    InMemoryStorage,
    LocalStorage,
    SessionStorage,
    { provide: Storage, useFactory: storageFactory }
  ]
})
export class StorageModule { }
