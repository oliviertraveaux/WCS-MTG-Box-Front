import { Route } from '@angular/router';
import { CreateAccountComponent } from './features/auth/pages/create-account/create-account.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { AuthGuard } from './features/auth/shared/guards/auth.guard';
import { HomePageComponent } from './features/home/pages/home-page.component';
import { USER_PANEL_ROUTES } from './features/user-panel/user-panel.route';

export const routes: Route[] = [
    {
        path: '',
        component: HomePageComponent,
        canActivate: [AuthGuard],
    },
    { path: 'register', component: CreateAccountComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'user-panel',
        loadComponent: () =>
            import('./features/user-panel/user-panel.component').then(
                (mod) => mod.UserPanelComponent
            ),
        children: USER_PANEL_ROUTES,
        canActivate: [AuthGuard],
    },
];
