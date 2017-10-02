
import * as moment from 'moment';

import { GENERAL } from '../constant/general.constant';


export function currentTimestamp(): number {
  return Math.floor(new Date().getTime() / 1000.0);
}

export function endOf(unit: string = GENERAL.EXPIRATION_UNIT, offset: number = 0): number {
  return moment().add(<any>offset, <any>unit).endOf(<any>unit).unix();
}

export function startOf(unit: string = GENERAL.EXPIRATION_UNIT, offset: number = 0): number {
  return moment().add(<any>offset, <any>unit).startOf(<any>unit).unix();
}
