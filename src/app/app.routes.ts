import { Route } from '@angular/router';
import { CreateAccountComponent } from './features/auth/pages/create-account/create-account.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { AuthGuard } from './features/auth/shared/guards/auth.guard';
import { HomePageComponent } from './features/home/pages/home-page.component';
import { USER_PANEL_ROUTES } from './features/user-panel/user-panel.route';
import {
  ForgottenPasswordComponent
} from "./features/auth/pages/forgotten-password/forgotten-password/forgotten-password.component";

export const routes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },
    {
        path: 'home',
        component: HomePageComponent,
    },
    { path: 'register', component: CreateAccountComponent },
    { path: 'login', component: LoginComponent },
  { path: 'forgotten-password', component: ForgottenPasswordComponent },
  { path: 'forgotten-password/:token', component: ForgottenPasswordComponent },
    {
        path: 'user-panel',
        loadComponent: () =>
            import('./features/user-panel/user-panel.component').then(
                (mod) => mod.UserPanelComponent
            ),
        children: USER_PANEL_ROUTES,
        canActivate: [AuthGuard],
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];
