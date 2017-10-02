/**
 * Created by glenn on 8/8/17.
 */

import { Authority } from '../../../core/network/authentication/shared/authority.model';
import { Token } from '../../../core/network/authentication/token/token.model';

export class User extends Token {

  public id: string = null;
  public authorities: Array<Authority> = Array<Authority>();
  public username: string = null;
  public name: string = null;
  public immediateLogout: boolean = false;
  public nip: string = null;
  public isEnabled: boolean = true;
  public isAccountActive: boolean = false;
  public isAvailable: boolean = true;
  public isPreLogout: boolean = false;
  public isPasswordExpired: boolean = false;

}
