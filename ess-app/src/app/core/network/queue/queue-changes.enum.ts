/**
 * Created by glenn on 11/9/16.
 */

export abstract class QueueEvents {
  public static CHANGED = 'queue.events.changed';
  public static ENQUEUE = 'queue.events.enqueue';
  public static DEQUEUE = 'queue.events.dequeue';
}

export enum QueueChanges {
  Unknown = -1,
  Enqueue = 0,
  Dequeue = 1,
  Cleared = 2
}
