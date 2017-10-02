/**
 * Created by glenn on 8/8/17.
 */

import { BaseModel } from '../../../base.model';

export class Authority extends BaseModel {

  constructor(public authority: string = null) {
    super();
  }

}
