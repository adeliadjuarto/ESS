/**
 * Created by glenn on 6/16/17.
 */

export abstract class HttpHeader {

  public static readonly ContentType: string = 'Content-Type';
  public static readonly ContentLength: string = 'Content-Length';
  public static readonly Cookie: string = 'Cookie';
  public static readonly SetCookie: string = 'Set-Cookie';
  public static readonly Authorization: string = 'Authorization';
  public static readonly Accept: string = 'Accept';
  public static readonly IfModifiedSince: string = 'If-Modified-Since';
  public static readonly IfNoneMatch: string = 'If-None-Match';
  public static readonly Date: string = 'Date';
  public static readonly ETag: string = 'ETag';
  public static readonly Expires: string = 'Expires';
  public static readonly Location: string = 'Location';
  public static readonly Pragma: string = 'Pragma';

}
