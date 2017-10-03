/**
 * Created by glenn on 11/11/16.
 */

import { List } from './../shared/model/index';
import { BlobSerializer } from './blob-serializer';
import { BufferSerializer } from './buffer-serializer';
import { JsonSerializer } from './json-serializer';
import { ListSerializer } from './list-serializer';
import { ObjectSerializer } from './object-serializer';
import { Serializer } from './serializer.interface';
import { TextSerializer } from './text-serializer';

export abstract class ResponseType implements Serializer {

  public static readonly Json: ResponseType = new JsonSerializer();
  public static readonly Text: ResponseType = new TextSerializer();
  public static readonly Blob: ResponseType = new BlobSerializer();
  public static readonly ArrayBuffer: ResponseType = new BufferSerializer();

  public static get listOf(): ResponseType { return new ObjectSerializer(List); }
  public static get list(): ResponseType { return new ObjectSerializer(List); }
  public static of(type): ResponseType { return new ObjectSerializer(type); }

  public abstract serialize(input: ArrayBuffer): any;

}
