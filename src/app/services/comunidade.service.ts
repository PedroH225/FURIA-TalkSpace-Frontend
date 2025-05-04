import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunidadeService {
  private apiUrl = 'http://localhost:8080';


  constructor(private http: HttpClient) {}

   getChats(): Observable<any[]> {
      const token = localStorage.getItem('token');
      return this.http.get<any[]>(`${this.apiUrl}/chats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }
}
