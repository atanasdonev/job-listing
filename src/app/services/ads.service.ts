import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ad } from '../models/ad.model';

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  private url = `${environment.apiUrl}/ads`;

  constructor(private http: HttpClient) {}

  getAds$() {
    return this.http.get<Ad[]>(this.url);
  }

  getAd$(id: number) {
    const url = `${this.url}/${id}`;
    return this.http.get<Ad>(url);
  }

  postAd$(ad: Ad) {
    return this.http.post<Ad>(this.url, ad);
  }

  deleteAd$(id: number) {
    const url = `${this.url}/${id}`;
    return this.http.delete<void>(url);
  }

  putAd$(data: any, id: number) {
    const url = `${this.url}/${id}`;
    return this.http.put<Ad>(url, data);
  }
}
