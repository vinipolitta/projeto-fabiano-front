import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { ClienteCreateComponent } from './components/clientes/cliente-create/cliente-create.component';
import { ClienteListComponent } from './components/clientes/cliente-list/cliente-list/cliente-list.component';
import { CreateTemplateComponent } from './components/template/create-template/create-template.component';
import { ClientFormComponent } from './components/clientes/client-form/client-form/client-form.component';
import { CadastroFormListComponent } from './components/cadastros-forms-list/cadastro-form-list/cadastro-form-list.component';
// Rotas da aplicação
export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'users',
    component: UserComponent
  },
  {
    path: 'clients/create',
    component: ClienteCreateComponent
  },
  {
    path: 'clients-list',
    component: ClienteListComponent
  },
  // ================================
  // Novas rotas para templates
  // ================================
  {
    path: 'create-template',
    component: CreateTemplateComponent // admin cria template
  },
  {
    path: 'client-templates',
    component: ClientFormComponent // cliente vê e preenche templates
  },
  {
    path: 'list-templates',
    component: CadastroFormListComponent // cliente vê e preenche templates
  }
];