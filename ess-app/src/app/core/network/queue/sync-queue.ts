/**
 * Created by glenn on 11/9/16.
 */

import { Queue } from './queue.interface';
import { QueueChanges, QueueEvents } from './queue-changes.enum';

export class SyncQueue<T> implements Queue<T> {

  public get count(): number {
    return this.container.length;
  }

  protected events: any = {};

  private container: Array<T> = Array<T>();

  public onChange(listener: (type: QueueChanges, item: T) => void) {
    this.on(QueueEvents.CHANGED, listener);
  }

  public clear() {
    this.container.length = 0;
    this.emit(QueueEvents.CHANGED, QueueChanges.Cleared, undefined);
  }

  public enqueue(item: T): T {
    this.container.push(item);

    this.emit(QueueEvents.CHANGED, QueueChanges.Enqueue, item);
    this.emit(QueueEvents.ENQUEUE, item);
    return item;
  }

  public dequeue(): T|undefined {
    let item: T|undefined = this.container.shift();

    this.emit(QueueEvents.CHANGED, QueueChanges.Dequeue, item);
    this.emit(QueueEvents.DEQUEUE, item);
    return item;
  }

  protected on(event: string, listener: Function) {
    let listeners: Array<Function> = this.events[event] || Array<Function>();
    listeners.push(listener);

    this.events[event] = listeners;
  }

  protected emit(event: string, ...args: Array<any>) {
    let listeners: Array<Function> = this.events[event] || Array<Function>();
    listeners.forEach((listener: (...args: Array<any>) => void) => {
      listener(...args);
    });
  }

}
