/**
 * Created by glenn on 6/10/17.
 */

import { HtmlStorage } from './html-storage.service';

export class LocalStorage extends HtmlStorage {

  constructor() {
    super(localStorage);
  }

}
