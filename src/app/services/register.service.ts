import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private urlUser = `${environment.apiUrl}/registeredUsers`;

  constructor(private http: HttpClient) {}

  postUser$(data: any) {
    return this.http.post<any>(this.urlUser, data);
  }

  getUsers$() {
    return this.http.get<any>(this.urlUser);
  }

  deleteUser$(id: number) {
    const url = `${this.urlUser}/${id}`;
    return this.http.delete<void>(url);
  }

  putUser$(id: number, data: any) {
    const url = `${this.urlUser}/${id}`;
    return this.http.put<any>(url, data);
  }
}
