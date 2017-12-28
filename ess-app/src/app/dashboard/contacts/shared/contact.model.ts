import { ContactNum } from './contact-num.interface';
import { BaseModel } from './../../../core/base.model';
import { FilterItem } from './../../../shared/search-filter/filter-item.model';

export class Contact extends BaseModel {
  constructor(public nip: String,
              public name: String,
              public jobTitle: FilterItem,
              public branch: FilterItem,
              public region: FilterItem,
              public isEmergency: boolean,
              public phoneNumber: ContactNum[]) {
                super();
  }

}
