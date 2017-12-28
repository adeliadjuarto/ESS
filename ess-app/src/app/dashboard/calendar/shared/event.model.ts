import { BaseModel } from './../../../core/base.model';

export class Event extends BaseModel {
  constructor(public summary: string,
              public start: number,
              public end: number) {
                super();
  }
}
