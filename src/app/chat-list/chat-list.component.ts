import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { ChatServiceService } from '../services/chat-service.service';

@Component({
  selector: 'app-chat-list',
  standalone: false,
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit, AfterViewInit {
  chats: any[] = [];
  selectedChatId: string | null = null;  // Variável para armazenar o chat selecionado

  constructor(
    private chatService: ChatServiceService,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    // Exemplo de token, remova isso quando for integrar com a autenticação real
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoIiwic3ViIjoiYjJjM2Q0ZTUtZjY3OC05MDEyLWJjMzQtZGU1NmZhNzhnaDkwIiwiZXhwIjoxNzQ2MTM5Mjc5fQ.AUjA7uHZkvcz2WX5Cii5m8-v9128-gf5064Jfd7WzGE");

    // Buscar chats
    this.buscarChats();
  }

  ngAfterViewInit(): void {
    const chatItems = this.elRef.nativeElement.querySelectorAll('.chat-item');
    chatItems.forEach((item: HTMLElement) => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id'); // Use 'data-id' em vez de 'id'
        if (id) {
          this.onChatSelect(id); // Agora está passando uma string
        }
      });
    });
  }
  

  buscarChats() {
    this.chatService.getEventos().subscribe(
      (response: any) => {
        this.chats = response.chatsParticipados;
      }
    );
  }

  onChatSelect(chatId: string): void {
    this.selectedChatId = chatId;
  }
}
