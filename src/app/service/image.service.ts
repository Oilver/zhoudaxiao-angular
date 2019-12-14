import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {
  }

  queryCarousels(): Observable<any> {
    return this.http.post(environment.url + '/image/queryCarousels', {});
  }

  deleteCarousels(id): Observable<any> {
    return this.http.post(environment.url + '/image/deleteCarousels?id=' + id, {});
  }

  updateCarousels(json): Observable<any> {
    return this.http.post(environment.url + '/image/updateCarousels', json);
  }

  deleteImage(id): Observable<any> {
    return this.http.post(environment.url + '/image/deleteImage?id=' + id, {});
  }
}
