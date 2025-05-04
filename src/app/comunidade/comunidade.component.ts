import { Component, OnInit } from '@angular/core';
import { ComunidadeService } from '../services/comunidade.service';

@Component({
  selector: 'app-comunidade',
  standalone: false,
  templateUrl: './comunidade.component.html',
  styleUrl: './comunidade.component.scss'
})
export class ComunidadeComponent implements OnInit{
chats : any[] = [];

constructor(private comunidadeService : ComunidadeService) {}

  
  ngOnInit() : void {
    this.carregarChats();
  }

  carregarChats() {
    this.comunidadeService.getChats().subscribe((response) => {
      this.chats = response;
    })
  }

  participar(chatId : string) {
    this.comunidadeService.participar(chatId).subscribe(() => {
      	this.carregarChats();
        alert("Chat ingressado com sucesso!");
    })
  }

  retirarParticipacao(chatId : string) {
    this.comunidadeService.retirarParticipacao(chatId).subscribe(() => {
      	this.carregarChats();
        alert("Participacao retirada com sucesso!");
    })
  }
}
