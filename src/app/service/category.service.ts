import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  queryAll(): Observable<any> {
    return this.http.post(environment.url + '/category/queryAll', null);
  }

  add(json): Observable<any> {
    return this.http.post(environment.url + '/category/add', json);
  }

  update(json): Observable<any> {
    return this.http.post(environment.url + '/category/update', json);
  }

  delete(id): Observable<any> {
    return this.http.post(environment.url + '/category/delete?id=' + id, null);
  }
}
