/**
 * Created by glenn on 8/8/17.
 */

import { Authority } from '../../../core/network/authentication/shared/authority.model';
import { Token } from '../../../core/network/authentication/token/token.model';

export class User extends Token {

  public id: string = null;
  public username: string = null;
  public name: string = null;
  public phone: number = null;
  public nip: string = null;
  public email: string = null;
  public isActive: boolean = false;
  public annualLeave: number = 12;
}

