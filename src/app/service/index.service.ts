import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(private http: HttpClient) {
  }

  login(json: any): Observable<any> {
    return this.http.post(environment.url + '/login', json);
  }

  logout(): Observable<any> {
    return this.http.post(environment.url + '/logout', {});
  }

  registry(json: any): Observable<any> {
    return this.http.post(environment.url + '/person/add', json);
  }
}
