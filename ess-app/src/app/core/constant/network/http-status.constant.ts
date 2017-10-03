/**
 * Created by glenn on 5/30/17.
 */

export abstract class HttpStatus {

  public abstract readonly code: number;
  public abstract readonly status: string;

  public static statusText(code: number): string {
    let key: string = Object.keys(HttpStatus).find((key: string) => HttpStatus[key].code === code);
    return (HttpStatus[key] || { status: null } ).status;
  }

  // Informational
  public static readonly CONTINUE: HttpStatus = { code: 100, status: 'Continue' };
  public static readonly SWITCHING_PROTOCOL: HttpStatus = { code: 101, status: 'Switching Protocol' };

  // Success
  public static readonly OK: HttpStatus = { code: 200, status: 'OK' };
  public static readonly CREATED: HttpStatus = { code: 201, status: 'Created' };
  public static readonly ACCEPTED: HttpStatus = { code: 202, status: 'Accepted' };
  public static readonly NON_AUTHORITIVE_INFO: HttpStatus = { code: 203, status: 'Non-Authoritive Information' };
  public static readonly NO_CONTENT: HttpStatus = { code: 204, status: 'No Content' };
  public static readonly RESET_CONTENT: HttpStatus = { code: 205, status: 'Reset Content' };
  public static readonly PARTIAL_CONTENT: HttpStatus = { code: 206, status: 'Partial Content' };

  // Redirection
  public static readonly MULTIPLE_CHOICE: HttpStatus = { code: 300, status: 'Multiple Choice' };
  public static readonly MOVED_PERMANENTLY: HttpStatus = { code: 301, status: 'Moved Permanently' };
  public static readonly FOUND: HttpStatus = { code: 302, status: 'Found' };
  public static readonly SEE_OTHERS: HttpStatus = { code: 303, status: 'See Others' };
  public static readonly NOT_MODIFIED: HttpStatus = { code: 304, status: 'Not Modified' };
  public static readonly USE_PROXY: HttpStatus = { code: 305, status: 'Use Proxy' };
  public static readonly SWITCH_PROXY: HttpStatus = { code: 306, status: 'Switch Proxy' };
  public static readonly TEMPORARY_REDIRECT: HttpStatus = { code: 307, status: 'Temporary Redirect' };
  public static readonly PERMANENT_REDIRECT: HttpStatus = { code: 308, status: 'Permanent Redirect' };

  // Client Error
  public static readonly BAD_REQUEST: HttpStatus = { code: 400, status: 'Bad Request' };
  public static readonly UNAUTHORIZED: HttpStatus = { code: 401, status: 'Unauthorized' };
  public static readonly PAYMENT_REQUIRED: HttpStatus = { code: 402, status: 'Payment Required' };
  public static readonly FORBIDDEN: HttpStatus = { code: 403, status: 'Forbidden' };
  public static readonly NOT_FOUND: HttpStatus = { code: 404, status: 'Not Found' };
  public static readonly METHOD_NOT_ALLOWED: HttpStatus = { code: 405, status: 'Method Not Allowed' };
  public static readonly NOT_ACCEPTABLE: HttpStatus = { code: 406, status: 'Not Acceptable' };
  public static readonly PROXY_AUTHENTICATION_REQUIRED: HttpStatus = { code: 407, status: 'Proxy Authentication Required' };
  public static readonly REQUEST_TIMEOUT: HttpStatus = { code: 408, status: 'Request Timeout' };
  public static readonly CONFLICT: HttpStatus = { code: 409, status: 'Conflict' };
  public static readonly GONE: HttpStatus = { code: 410, status: 'Gone' };
  public static readonly LENGTH_REQUIRED: HttpStatus = { code: 411, status: 'Length Required' };
  public static readonly PRECONDITION_FAILED: HttpStatus = { code: 412, status: 'Precondition Failed' };
  public static readonly REQUEST_TOO_LARGE: HttpStatus = { code: 413, status: 'Payload Too Large' };
  public static readonly URI_TOO_LONG: HttpStatus = { code: 414, status: 'URI Too Long' };
  public static readonly UNSUPPORTED_MEDIA_TYPE: HttpStatus = { code: 415, status: 'Unsupported Media Type' };
  public static readonly REQUEST_RANGE_NOT_SATISFIED: HttpStatus = { code: 416, status: 'Range Not Satisfiable' };
  public static readonly EXPECTATION_FAILED: HttpStatus = { code: 417, status: 'Expectation Failed' };
  public static readonly I_AM_A_TEAPOT: HttpStatus = { code: 418, status: 'I\'m A Teapot' };
  public static readonly MISDIRECT_REQUEST: HttpStatus = { code: 421, status: 'Missdirect Request' };
  public static readonly UPGRADE_REQUIRED: HttpStatus = { code: 426, status: 'Upgrade Required' };
  public static readonly PRECONDITION_REQUIRED: HttpStatus = { code: 428, status: 'Precondition Required' };
  public static readonly TOO_MANY_REQUEST: HttpStatus = { code: 429, status: 'Too Many Requests' };
  public static readonly REQUEST_HEADER_TOO_LARGE: HttpStatus = { code: 431, status: 'Request Header Fields Too Large' };
  public static readonly UNAVAILABLE_FOR_LEGAL: HttpStatus = { code: 451, status: 'Unavailable For Legal Reason' };

  // Server Error
  public static readonly INTERNAL_SERVER_ERROR: HttpStatus = { code: 500, status: 'Internal Server Error' };
  public static readonly NOT_IMPLEMENTED: HttpStatus = { code: 501, status: 'Not Implemented' };
  public static readonly BAD_GATEWAY: HttpStatus = { code: 502, status: 'Bad Gateway' };
  public static readonly SERVICE_UNAVAILABLE: HttpStatus = { code: 503, status: 'Service Unavailable' };
  public static readonly GATEWAY_TIMEOUT: HttpStatus = { code: 504, status: 'Gateway Timeout' };
  public static readonly HTTP_NOT_SUPPORTED: HttpStatus = { code: 505, status: 'HTTP Version Not Supported' };
  public static readonly VARIANT_NEGOTIATE: HttpStatus = { code: 506, status: 'Variant Also Negotiates' };
  public static readonly NOT_EXTENDED: HttpStatus = { code: 510, status: 'Not Extended' };
  public static readonly NETWORK_AUTHENTICATION_REQUIRED: HttpStatus = { code: 511, status: 'Network Authentication Required' };

}

