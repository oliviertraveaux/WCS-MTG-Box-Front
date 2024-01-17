import { Routes } from '@angular/router';
import {SearchPageComponent} from "./features/search/components/ui/search-page/search-page.component";
import {CollectionPageComponent} from "./features/collection/components/ui/collection-page/collection-page.component";
import {ProfilPageComponent} from "./features/profil/components/ui/profil-page/profil-page.component";
import {CreateAccountComponent} from "./features/auth/components/feature/create-account/create-account.component";

export const routes: Routes = [
  { path: '', component: SearchPageComponent },
  { path: 'register', component: CreateAccountComponent  },
  { path: 'collection', component: CollectionPageComponent },
  { path: 'profil', component: ProfilPageComponent },
];

