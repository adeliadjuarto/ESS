/**
 * Created by glenn on 7/25/17.
 */

import { HtmlStorage } from './html-storage.service';

export class SessionStorage extends HtmlStorage {

  constructor() {
    super(sessionStorage);
  }

}
