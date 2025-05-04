import { Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatServiceService } from '../services/chat-service.service';

@Component({
  selector: 'app-chat-content',
  standalone: false,
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss']
})
export class ChatContentComponent implements OnChanges, OnDestroy {
  @Input() chatId: string | null = null;
  chat: any;
  @Input() mensagem: string = '';
  @Input() usuarioId: string = '';

  mensagens: any[] = [];

  @ViewChild('chatMessages') chatMessages!: ElementRef;

  private messageSubscription?: Subscription;

  constructor(private chatService: ChatServiceService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chatId'] && this.chatId !== null) {
      this.loadChat(this.chatId);
      this.loadMensagens(this.chatId);
      this.connectToWebSocket(this.chatId);
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.messageSubscription?.unsubscribe();
    this.chatService.disconnect();
  }

  connectToWebSocket(chatId: string): void {
    // Limpa a assinatura anterior
    this.messageSubscription?.unsubscribe();

    this.chatService.connect(chatId); // Se possível, você também deveria fechar a conexão anterior aqui
    this.messageSubscription = this.chatService.message$.subscribe((message) => {
      if (message) {
        let mensagemRecebida = this.checarAutor(message, this.usuarioId);
        this.mensagens.push(mensagemRecebida);
      }
    });
  }

  checarAutor(mensagem: any, usuarioId: string): any {
    mensagem.autor = mensagem.usuario.id == usuarioId;
    return mensagem;
  }

  loadChat(chatId: string): void {
    this.chatService.getEvento(chatId).subscribe((response: any) => {
      this.chat = response;
    });
  }

  loadMensagens(chatId: string) {
    this.chatService.getEventoMensagens(chatId).subscribe((response: any) => {
      this.mensagens = response;
    });
  }

  enviarMensagem() {
    if (!this.mensagem.trim()) return;

    const payload = {
      conteudo: this.mensagem,
      dataEnvio: new Date()
    };

    this.chatService.enviarMensagem(this.chat.id, payload).subscribe(() => {
      this.mensagem = '';
    });
  }

  scrollToBottom(): void {
    try {
      this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
