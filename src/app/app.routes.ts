import { Routes } from '@angular/router';
import {CreateAccountComponent} from "./features/auth/components/feature/create-account/create-account.component";
import {SearchPageComponent} from "./features/search/components/ui/search-page/search-page.component";
import {CollectionPageComponent} from "./features/collection/components/ui/collection-page/collection-page.component";
import {ProfilPageComponent} from "./features/profil/components/ui/profil-page/profil-page.component";
import {LoginComponent} from "./features/auth/components/feature/login/login.component";
import {AuthGuard} from "./features/auth/shared/auth.guard";


export const routes: Routes = [
  { path: '', component: SearchPageComponent, canActivate: [AuthGuard]},
  { path: 'register', component: CreateAccountComponent },
  { path: 'collection', component: CollectionPageComponent },
  { path: 'profil', component: ProfilPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];


;
