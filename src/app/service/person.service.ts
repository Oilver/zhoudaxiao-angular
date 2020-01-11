import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) {
  }

  queryPersonList(json: any): Observable<any> {
    return this.http.post(environment.url + '/person/queryPersonList', json);
  }

  updatePerson(json: any): Observable<any> {
    return this.http.post(environment.url + '/person/update', json);
  }

  queryCurrentPerson(json: any): Observable<any> {
    return this.http.post(environment.url + '/person/queryCurrentPerson', json);
  }

  delete(id: any): Observable<any> {
    return this.http.post(environment.url + '/person/delete', id);
  }
}
