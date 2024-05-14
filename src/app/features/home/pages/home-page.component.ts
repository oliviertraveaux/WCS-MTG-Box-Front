import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { RequestStatus } from '../../../shared/enums/request-status.enum';
import { BreakpointObserverService } from '../../../shared/services/breakpoint-observer.service';
import { SearchFormHomeService } from '../../../shared/services/search-form/search-form-home.service';
import { SearchFormService } from '../../../shared/services/search-form/search-form.service';
import { SearchFormDrawerComponent } from '../../../shared/ui/search-form/search-form-drawer/search-form-drawer.component';
import { SearchFormNameOnlyComponent } from '../../../shared/ui/search-form/search-form-name-only/search-form-name-only.component';
import { CollectionDisplaySearchFormComponent } from '../../user-panel/collection/components/collection-display/collection-display-search-form/collection-display-search-form.component';
import { SearchQuery } from '../../user-panel/collection/models/search-query.model';
import { HomeSearchFormComponent } from '../components/home-search-form/home-search-form.component';
import { HomeSearchResultsComponent } from '../components/home-search-results/home-search-results.component';
import { HomeCardSearchResult } from '../models/home-search-results.model';
import { HomeSearchResultsStatesService } from '../shared/services/home-search-results-states.service';
import { HomeSearchResultsService } from '../shared/services/home-search-results.service';

@Component({
    selector: 'app-search-page',
    standalone: true,
    imports: [
        CommonModule,
        MatSidenavModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        RouterLink,
        HomeSearchFormComponent,
        SearchFormDrawerComponent,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        CollectionDisplaySearchFormComponent,
        TranslateModule,
        SearchFormNameOnlyComponent,
        HomeSearchResultsComponent,
        MatProgressSpinnerModule,
    ],
    providers: [
        SearchFormHomeService,
        { provide: SearchFormService, useExisting: SearchFormHomeService },
        HomeSearchResultsService,
    ],
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
    @ViewChild('filterDrawer') filterDrawer!: MatDrawer;
    private _breakpointObserverService = inject(BreakpointObserverService);
    private _searchFormService = inject(SearchFormHomeService);
    private _homeSearchResultService = inject(HomeSearchResultsService);
    private _homeSearchResultStatesService = inject(HomeSearchResultsStatesService);

    protected readonly RequestStatus = RequestStatus;

    readonly isTablet = this._breakpointObserverService.isTablet;
    readonly isDesktop = this._breakpointObserverService.isDesktop;

    searchForm = this._searchFormService.searchForm;
    cardResults$!: Observable<HomeCardSearchResult[]>;

    isFrenchSearch: Observable<boolean> = this._homeSearchResultStatesService.getIsFrenchSearch$();
    status$: Observable<RequestStatus> =
        this._homeSearchResultStatesService.getSearchRequestStatus$();

    ngOnInit() {
        this.cardResults$ = this._homeSearchResultStatesService.getHomeCards$();
        this._searchFormService.updateValidityWhenFormValueChanges();
    }

    search() {
        this._homeSearchResultStatesService.setIsFrenchSearch(
            this._searchFormService.languageControl.name === 'French'
        );
        const searchQuery: SearchQuery = this._searchFormService.getSearch();
        this._homeSearchResultService.searchCards(searchQuery);
    }

  toggleFilterDrawer() {
    this.filterDrawer.toggle();
  }

  scrollToDrawer() {
    const drawerContainer = document.getElementById('drawerContainer');
    if (drawerContainer) {
      drawerContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

    searchStarted() {
        this._homeSearchResultStatesService.setIsFrenchSearch(
            this._searchFormService.languageControl.name === 'French'
        );
    }
}
