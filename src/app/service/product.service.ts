import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) {
  }

  queryProductList(json): Observable<any> {
    return this.http.post(environment.url + '/product/queryProductList', json);
  }

  checkIsExist(name): Observable<any> {
    return this.http.post(environment.url + '/product/checkIsExist?name=' + name, {});
  }

  add(json): Observable<any> {
    return this.http.post(environment.url + '/product/add', json);
  }

  delete(id): Observable<any> {
    return this.http.post(environment.url + '/product/delete?id=' + id, {});
  }

  query(id): Observable<any> {
    return this.http.post(environment.url + '/product/query?id=' + id, {});
  }

  update(json): Observable<any> {
    return this.http.post(environment.url + '/product/update', json);
  }
}
