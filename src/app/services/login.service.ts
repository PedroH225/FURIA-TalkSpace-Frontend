import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  fazerLogin(payload: any): Observable<any> {
      return this.http.post<any[]>(`${this.apiUrl}/usuarios/login`, payload, {
      });
    }
}
