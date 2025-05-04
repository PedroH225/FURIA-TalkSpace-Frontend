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

    participar(chatId : string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.put<any[]>(`${this.apiUrl}/chats/addUser/${chatId}`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }

    retirarParticipacao(chatId : string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.delete<any[]>(`${this.apiUrl}/chats/removerUser/${chatId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }
}
