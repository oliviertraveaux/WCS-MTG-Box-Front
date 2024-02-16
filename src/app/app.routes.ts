import { Routes } from '@angular/router';
import {SearchPageComponent} from "./features/search/components/ui/search-page/search-page.component";
import {CollectionAddCardPageComponent} from "./features/collection/pages/collection-add-card-page/collection-add-card-page.component";
import {ProfilPageComponent} from "./features/profil/components/ui/profil-page/profil-page.component";

export const routes: Routes = [
  { path: '', component: SearchPageComponent },
  { path: 'collection/add', component: CollectionAddCardPageComponent },
  { path: 'profil', component: ProfilPageComponent },
];
