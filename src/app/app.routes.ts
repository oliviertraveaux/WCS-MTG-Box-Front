import { Route } from '@angular/router';
import { CreateAccountComponent } from './features/auth/pages/create-account/create-account.component';
import { ForgottenPasswordComponent } from './features/auth/pages/forgotten-password/forgotten-password/forgotten-password.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { AuthGuard } from './features/auth/shared/guards/auth.guard';
import { HomePageComponent } from './features/home/pages/home-page.component';
import { CardAdPageComponent } from './features/transaction/card-ad/pages/card-ad-page/card-ad-page.component';
import { OfferCreatePageComponent } from './features/transaction/offer/pages/offer-create/offer-create-page.component';
import { preventMakeOfferGuard } from './features/transaction/offer/shared/guards/preventMakeOffer.guard';
import { collectionDisplayResolver } from './features/user-panel/collection/shared/services/collection-display/collection-display.resolver';
import { USER_PANEL_ROUTES } from './features/user-panel/user-panel.route';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';

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
        path: 'card-ad/:id',
        component: CardAdPageComponent,
    },
    {
        path: 'card-ad/:id/make-offer',
        component: OfferCreatePageComponent,
        canActivate: [AuthGuard, preventMakeOfferGuard],
        resolve: { collection: collectionDisplayResolver },
    },
    {
        path: 'page-not-found',
        component: PageNotFoundComponent,
    },
    {
        path: '**',
        component: PageNotFoundComponent,
    },
];
