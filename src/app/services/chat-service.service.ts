import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Client, IMessage } from '@stomp/stompjs'; // Não use mais o 'over'
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  private apiUrl = 'http://localhost:8080';
  private stompClient: Client | null = null;
  private messageSubject = new BehaviorSubject<any>(null);
  message$ = this.messageSubject.asObservable();

  constructor(private http: HttpClient) {}

  getEventos(): Observable<any[]> {
    const token = localStorage.getItem('token');
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/find`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  getEvento(eventoId: string): Observable<any[]> {
    const token = localStorage.getItem('token');
    return this.http.get<any[]>(`${this.apiUrl}/chats/${eventoId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  getEventoMensagens(eventoId: string): Observable<any[]> {
    const token = localStorage.getItem('token');
    return this.http.get<any[]>(`${this.apiUrl}/mensagens/chat/${eventoId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  enviarMensagem(eventoId: string, payload: any): Observable<any[]> {
    const token = localStorage.getItem('token');
    return this.http.post<any[]>(`${this.apiUrl}/mensagens/${eventoId}`, payload, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  connect(chatId: string) {
    const socket = new SockJS(`${this.apiUrl}/ws`); // URL do endpoint STOMP via SockJS
    this.stompClient = new Client({
      webSocketFactory: () => socket as any, // Use webSocketFactory com SockJS
      connectHeaders: {},
      debug: (str) => { console.log(str); },
      onConnect: (frame) => {
        console.log('Conectado ao WebSocket: ' + frame);
  
        // Subscrição ao tópico de chat
        this.stompClient?.subscribe(`/topic/chat/${chatId}`, (message: IMessage) => {
          if (message.body) {
            this.messageSubject.next(JSON.parse(message.body));
          }
        });
      },
      onStompError: (frame) => {
        console.error('Erro no WebSocket: ' + frame);
      }
    });
  
    this.stompClient.activate();
  }

  // Desconectar do WebSocket
  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate(); // Correção: substitui 'disconnect' por 'deactivate'
      console.log('Desconectado do WebSocket');
    }
  }
}
