import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UrlConstant} from '../constant/UrlConstant';
import {Observable} from 'rxjs';
import {HeaderConstant} from '../constant/HeaderConstant';
import {SessionConstant} from '../constant/SessionConstant';
import {map} from 'rxjs/operators';
import {Transfer} from '../model/transfer';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  constructor(private httpclient: HttpClient) {
  }

  public getTransfers(orderByDateAscending: boolean, orderByAmountAscending: boolean, page: number, size: number): Observable<any> {
    return this.httpclient.post(environment.baseUrl + UrlConstant.GET_TRANSFERS +
      '?page=' + page + '&size=' + size, {
      orderByDateAscending,
      orderByAmountAscending
    }, {
      headers: new HttpHeaders({
        [HeaderConstant.AUTHORIZATION]: 'Bearer ' + sessionStorage.getItem(SessionConstant.SESSION_TOKEN)
      })
    }).pipe(map((response: any) => {
      const transfer: Transfer[] = response.movements;
      return transfer;
    }));
  }

}
