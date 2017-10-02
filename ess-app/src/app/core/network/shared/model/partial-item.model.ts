/**
 * Created by glenn on 12/9/16.
 */

export interface PartialItemObject { id: string; message?: string; }

export class PartialItem {

  constructor(public successEntities: Array<PartialItemObject> = Array<PartialItemObject>(),
              public failEntities: Array<PartialItemObject> = Array<PartialItemObject>()) { }

}
