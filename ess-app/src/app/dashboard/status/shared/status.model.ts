import { BaseModel } from './../../../core/base.model';

export class Status extends BaseModel {
  constructor(public title: string,
              public description: string,
              public start: number,
              public end: number,
              public statusDate: string,
              public statusInformation: string) {
                super();
  }

}
