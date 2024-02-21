import { Route } from '@angular/router';
import { CollectionAddCardPageComponent } from './collection/pages/collection-add-card-page/collection-add-card-page.component';

export const USER_PANEL_ROUTES: Route[] = [
    { path: 'collection/add', component: CollectionAddCardPageComponent },
    { path: 'collection', component: CollectionAddCardPageComponent },
];
