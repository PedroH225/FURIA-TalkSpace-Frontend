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

  constructor(private chatService : ChatServiceService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chatId'] && this.chatId !== null) {
      this.loadChatMessages(this.chatId);
    }
  }

  loadChatMessages(chatId: string): void {
    this.chatService.getEventosMensagens(chatId).subscribe(
      (response : any) => {
        this.chat = response;
      })
}

}