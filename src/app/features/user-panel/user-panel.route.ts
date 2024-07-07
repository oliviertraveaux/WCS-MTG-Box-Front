import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { SearchFormService } from '../../shared/services/search-form/search-form.service';
import { AdminPageComponent } from './admin/pages/admin-page.component';
import { CollectionAddCardPageComponent } from './collection/pages/collection-add-card-page/collection-add-card-page.component';
import { CollectionDisplayPageComponent } from './collection/pages/collection-display-page/collection-display-page.component';
import { collectionAddCardGuard } from './collection/shared/services/collection-add-card/collection-add-card.guard';
import { collectionDisplayGuard } from './collection/shared/services/collection-display/collection-display.guard';
import { collectionDisplayResolver } from './collection/shared/services/collection-display/collection-display.resolver';
import { HistoryPageComponent } from './history/pages/history-page/history-page.component';
import { MessagesPageComponent } from './messages/pages/messages-page/messages-page.component';
import { OffersMadePageComponent } from './offers-made/pages/offers-made-page/offers-made-page.component';
import { OffersReceivedPageComponent } from './offers-received/pages/offers-received-page/offers-received-page.component';
import { ProfilePageComponent } from './profile/pages/profile-page/profile-page.component';

export const USER_PANEL_ROUTES: Route[] = [
    {
        path: 'add',
        component: CollectionAddCardPageComponent,
        canDeactivate: [collectionAddCardGuard],
    },
    {
        path: 'collection',
        component: CollectionDisplayPageComponent,
        canDeactivate: [collectionDisplayGuard, () => inject(SearchFormService).reset()],
        resolve: { collection: collectionDisplayResolver },
    },
    { path: 'profile', component: ProfilePageComponent },
    { path: 'history', component: HistoryPageComponent },
    { path: 'offers-received', component: OffersReceivedPageComponent },
    { path: 'offers-made', component: OffersMadePageComponent },
    { path: 'messages', component: MessagesPageComponent },
    { path: 'admin', component: AdminPageComponent },
];
