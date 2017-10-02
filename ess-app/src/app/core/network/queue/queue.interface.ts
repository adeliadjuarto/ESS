/**
 * Created by glenn on 11/9/16.
 */

import { QueueChanges } from './queue-changes.enum';

export interface Queue<T> {
  readonly count: number;

  clear(): void;
  enqueue(item: T): T;
  dequeue(): T|undefined;
  onChange(listener: (type: QueueChanges, item: T) => void): void;
}
