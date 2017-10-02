import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { NetworkService } from './network.service';
import { Request } from './request.interface';

@Injectable()
export class ApiService extends NetworkService {

  protected static apiUrl: string = environment.apiUrl;

  public get baseUrl(): string {
    return ApiService.apiUrl;
  }

  public create(path: string): Request {
    let absoluteUrl: URL = new URL(path, this.baseUrl);
    return super.create(absoluteUrl.toString());
  }

}
