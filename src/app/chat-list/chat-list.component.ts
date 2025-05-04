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
