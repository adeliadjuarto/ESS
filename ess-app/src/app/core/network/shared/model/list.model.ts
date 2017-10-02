/**
 * Created by glenn on 12/5/16.
 */

export class List<T> {

  constructor (public first = true,
               public last = true,
               public totalPages = 1,
               public content: Array<T> = Array<T>(),
               public totalElements = 0,
               public numberOfElements = 0,
               public size = 0,
               public sort: Array<any> = Array<any>()) { }

}
