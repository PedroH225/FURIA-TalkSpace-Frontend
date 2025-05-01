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
  usuarioId : string = '';

  constructor(
    private chatService: ChatServiceService,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    // Exemplo de token, remova isso quando for integrar com a autenticação real
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoIiwic3ViIjoiMzc5OTdiYjUtOGJiYS00NzA3LWFlMTMtNmQ4OWI0Y2RmNjY4In0.flHY6juTEBilpBz1u3E_DqPhzn-jLA_HQI4FgWXUHg4");

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
        this.usuarioId = response.id
        this.chats = response.chatsParticipados;
      }
    );
  }

  onChatSelect(chatId: string): void {
    this.selectedChatId = chatId;
  }
}
