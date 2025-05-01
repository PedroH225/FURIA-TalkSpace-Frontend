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

  getEvento(eventoId : string): Observable<any[]> {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(`${this.apiUrl}/chats/${eventoId}`, {
      headers: {'Authorization': `Bearer ${token}` }
    });
  }

  getEventoMensagens(eventoId : string): Observable<any[]> {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(`${this.apiUrl}/mensagens/chat/${eventoId}`, {
      headers: {'Authorization': `Bearer ${token}` }
    });
  }

  enviarMensagem(eventoId : string, payload : any): Observable<any[]> {
    const token = localStorage.getItem('token');

    return this.http.post<any[]>(`${this.apiUrl}/mensagens/${eventoId}`, payload, {
      headers: {'Authorization': `Bearer ${token}` }
    });
  }
}
