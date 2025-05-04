import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatListComponent } from './chat-list/chat-list.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path: 'chat', component: ChatListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistroComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
