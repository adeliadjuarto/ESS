/**
 * Created by glenn on 6/16/17.
 */

export abstract class MimeType {

  public static readonly Binary: string = 'application/octet-stream';
  public static readonly Json: string = 'application/json';
  public static readonly Xml: string = 'application/xml';
  public static readonly Pdf: string = 'application/pdf';
  public static readonly Zip: string = 'application/zip';
  public static readonly Text: string = 'text/plain';
  public static readonly Html: string = 'text/html';
  public static readonly MultipartForm: string = 'multipart/form-data';
  public static readonly FormData: string = 'application/x-www-form-urlencoded';
  public static readonly Image: string = 'image/*';
  public static readonly Jpeg: string = 'image/jpeg';
  public static readonly Png: string = 'image/png';
  public static readonly Gif: string = 'image/gif';

}
