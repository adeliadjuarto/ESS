
import { GENERAL } from '../../../constant/index';

export abstract class Token {

  public get expiration(): number {
    return GENERAL.EXPIRATION;
  }

}
