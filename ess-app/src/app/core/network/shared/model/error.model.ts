/**
 * Created by glenn on 6/9/17.
 */

import * as moment from 'moment';

export class Error {

  public status: number = 0;

  constructor(public error: string = 'error',
              public message: string = 'An Error Has Occured',
              public timestamp: number = moment().unix()) {
  }

}
