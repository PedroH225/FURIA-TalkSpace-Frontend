import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getEventos(): Observable<any[]> {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(`${this.apiUrl}/usuarios/find`, {
      headers: {'Authorization': `Bearer ${token}` }
    });
  }

  getEventosMensagens(eventoId : string): Observable<any[]> {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(`${this.apiUrl}/chats/${eventoId}`, {
      headers: {'Authorization': `Bearer ${token}` }
    });
  }
}
