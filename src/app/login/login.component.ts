import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  errorMessage: string = ''; // Para armazenar a mensagem de erro

  constructor(private loginService: LoginService, private router: Router) { }

  fazerLogin() {
    const payload = {
      "email": this.email,
      "senha": this.senha
    }


    this.loginService.fazerLogin(payload).subscribe(
      (response) => {
        localStorage.setItem("token", response.token);
        this.router.navigate(['/chat']);
      },
      (error) => {
        // Em caso de erro, exibe a mensagem de erro
        this.errorMessage = 'Email ou senha incorretos';
        console.log(this.errorMessage);
      }
    );
  }
}
