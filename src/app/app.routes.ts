import { Routes } from '@angular/router';
import {CreateAccountComponent} from "./features/auth/components/feature/create-account/create-account.component";
import {SearchPageComponent} from "./features/search/components/ui/search-page/search-page.component";
import {CollectionAddCardPageComponent} from "./features/collection/pages/collection-add-card-page/collection-add-card-page.component";
import {ProfilPageComponent} from "./features/profil/components/ui/profil-page/profil-page.component";
import {LoginComponent} from "./features/auth/components/feature/login/login.component";
import {AuthGuard} from "./features/auth/shared/guards/auth.guard";




export const routes: Routes = [
  { path: '', component: SearchPageComponent, canActivate: [AuthGuard]},
  { path: 'register', component: CreateAccountComponent },
  { path: 'collection', component: CollectionPageComponent,canActivate: [AuthGuard] },
  { path: 'profil', component: ProfilPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'collection/add', component: CollectionAddCardPageComponent },
  { path: '', component: SearchPageComponent },
];



