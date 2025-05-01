import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChatServiceService } from '../services/chat-service.service';

@Component({
  selector: 'app-chat-content',
  standalone: false,
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss']
})
export class ChatContentComponent implements OnChanges {
  @Input() chatId: string | null = null;
  chat: any;
  @Input() mensagem : string = '';

  mensagens : any[] = [];


  constructor(private chatService : ChatServiceService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chatId'] && this.chatId !== null) {
      this.loadChat(this.chatId);
      this.loadMensagens(this.chatId);
    }
  }

  loadChat(chatId: string): void {
    this.chatService.getEvento(chatId).subscribe(
      (response : any) => {
        this.chat = response;
      })
}

loadMensagens(chatId : string) {
  this.chatService.getEventoMensagens(chatId).subscribe(
    (response : any) => {
      this.mensagens = response;
    })
}

enviarMensagem() {
  if (!this.mensagem.trim()) return;

  const payload = {
    conteudo: this.mensagem,
    dataEnvio: new Date()
  };

  this.chatService.enviarMensagem(this.chat.id, payload).subscribe(res => {
    this.mensagem = '';
  });
}

}