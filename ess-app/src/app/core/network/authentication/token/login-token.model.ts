/**
 * Created by glenn on 7/31/17.
 */
import { Token } from './token.model';

export class LoginToken extends Token {

  constructor(public token: string) {
    super();
  }

}
