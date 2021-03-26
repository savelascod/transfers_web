import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UrlConstant} from '../constant/UrlConstant';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpclient: HttpClient) {
  }

  public authenticate(username: string, password: string): Observable<any> {
    return this.httpclient.post(environment.baseUrl + UrlConstant.AUTHENTICATE, {
      username, password
    }).pipe();
  }

}

