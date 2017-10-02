/**
 * Created by glenn on 6/10/17.
 */

export interface StorageObject {
  expiration: number,
  value: string
}

export abstract class Storage {

  public abstract set(key: string, value: any, expiration?: number): void;
  public abstract get(key: string): any;
  public abstract delete(key: string): any;
  public abstract hasKey(key: string): boolean;
  public abstract clear(): void;

  protected serialize(object: StorageObject): string {
    return btoa(JSON.stringify(object));
  }

  protected unserialize(raw: string): StorageObject {
    try {
      return JSON.parse(atob(raw));
    } catch (e) {
      return null;
    }
  }

}
