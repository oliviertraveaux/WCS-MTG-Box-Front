import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { SearchFormService } from '../../shared/services/search-form/search-form.service';
import { CollectionAddCardPageComponent } from './collection/pages/collection-add-card-page/collection-add-card-page.component';
import { CollectionDisplayPageComponent } from './collection/pages/collection-display-page/collection-display-page.component';
import { collectionAddCardGuard } from './collection/shared/services/collection-add-card/collection-add-card.guard';
import { MessagesPageComponent } from './messages/pages/messages-page/messages-page.component';
import { OffersMadePageComponent } from './offers-made/pages/offers-made-page/offers-made-page.component';
import { OffersReceivedPageComponent } from './offers-received/pages/offers-received-page/offers-received-page.component';
import { ProfilePageComponent } from './profile/pages/profile-page/profile-page.component';

export const USER_PANEL_ROUTES: Route[] = [
    {
        path: 'collection/add',
        component: CollectionAddCardPageComponent,
        canDeactivate: [collectionAddCardGuard],
    },
    {
        path: 'collection',
        component: CollectionDisplayPageComponent,
        canDeactivate: [() => inject(SearchFormService).reset()],
    },
    { path: 'profile', component: ProfilePageComponent },
    { path: 'history', component: ProfilePageComponent },
    { path: 'offers-received', component: OffersReceivedPageComponent },
    { path: 'offers-made', component: OffersMadePageComponent },
    { path: 'messages', component: MessagesPageComponent },
];
