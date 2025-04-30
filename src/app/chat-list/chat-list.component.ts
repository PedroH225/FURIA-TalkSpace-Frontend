import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../services/chat-service.service';

@Component({
  selector: 'app-chat-list',
  standalone: false,
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})
export class ChatListComponent implements OnInit  {
  chats : any[] = [];

  constructor(
    private chatService : ChatServiceService
  ) {}

  ngOnInit(): void {
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoIiwic3ViIjoiYjYzNGJlY2YtNDdmOS00Yzk5LWE0NWUtZjAwZjUzMWUyOWJiIn0.r9gY2C3rru_VeJwYlNiGlZWGa6DgVr8ElwaRsZBuOz0");
    this.buscarChats();
  }

  buscarChats() {
    this.chatService.getEventos().subscribe(
      (response : any) => {
        this.chats = response.chatsParticipados;
    });
}
}