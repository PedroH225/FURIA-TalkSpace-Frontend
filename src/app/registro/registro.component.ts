import { Component } from '@angular/core';
import { RegistroService } from '../services/registro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  nome : string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  errorMessage: string = '';

  constructor(private registroService: RegistroService, private router: Router) {}

  fazerRegistro() {
    if (this.senha !== this.confirmarSenha) {
      this.errorMessage = 'As senhas não coincidem';
      return;
    }

    const payload = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    };

    this.registroService.fazerRegistro(payload).subscribe(
      (response : any) => {
        this.router.navigate(['/login']);
      },
      (error : any) => {
        this.errorMessage = 'Erro ao registrar usuário. Tente novamente.';
        console.log(error);
      }
    );
  }
}