import { BaseModel } from './../../../core/base.model';
import { FilterItem } from './../../../shared/search-filter/filter-item.model';

export interface ContactNum {
  id: String;
  contactId: String;
  type: String;
  icon?: String;
  number: String;
  extension?: String;
}

export class Provider extends BaseModel {
  constructor(  public address: string,
                public city: string,
                public id: string,
                public provider: string,
                public insuranceType: FilterItem,
                public name: string,
                public providerType: FilterItem,
                public serviceType: FilterItem,
                public telephone: string,
                public fax: string,
                public bpjs?: string) {
                super();
  }

}

