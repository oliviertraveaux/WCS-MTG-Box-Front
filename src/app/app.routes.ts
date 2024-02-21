import { Route } from '@angular/router';
import { CreateAccountComponent } from './features/auth/pages/create-account/create-account.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { AuthGuard } from './features/auth/shared/guards/auth.guard';
import { SearchPageComponent } from './features/search/components/ui/search-page/search-page.component';
import { ProfilPageComponent } from './features/user-panel/profil/components/ui/profil-page/profil-page.component';
import { USER_PANEL_ROUTES } from './features/user-panel/user-panel.route';

export const routes: Route[] = [
    { path: '', component: SearchPageComponent, canActivate: [AuthGuard] },
    { path: 'register', component: CreateAccountComponent },
    { path: 'profil', component: ProfilPageComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    // { path: 'collection/add', component: CollectionAddCardPageComponent, canActivate: [AuthGuard] },
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
