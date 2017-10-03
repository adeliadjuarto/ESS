/**
 * Created by glenn on 11/9/16.
 */

import { strEnum } from '../../utilities/string.utilities';

export const RequestMethod = strEnum([
  'Head',
  'Delete',
  'Get',
  'Options',
  'Patch',
  'Post',
  'Put'
]);

export type HttpMethod = keyof typeof RequestMethod;
