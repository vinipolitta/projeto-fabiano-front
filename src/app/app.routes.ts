import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { ClienteCreateComponent } from './components/clientes/cliente-create/cliente-create.component';

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
		path: 'create-cliente',
		component: ClienteCreateComponent
	},

];
