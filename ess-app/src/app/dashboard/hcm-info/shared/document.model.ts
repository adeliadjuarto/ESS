import { BaseModel } from './../../../core/base.model';

export class Document extends BaseModel {
  constructor(public category: string,
              public path: string,
              public title: string) {
                super();
  }

}
