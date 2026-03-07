import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';

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
	}
];
