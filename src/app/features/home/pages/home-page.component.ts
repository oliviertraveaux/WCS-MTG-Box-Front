import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BreakpointObserverService } from '../../../shared/services/breakpoint-observer.service';
import { SearchFormHomeService } from '../../../shared/services/search-form/search-form-home.service';
import { SearchFormService } from '../../../shared/services/search-form/search-form.service';
import { SearchFormDrawerComponent } from '../../../shared/ui/search-form/search-form-drawer/search-form-drawer.component';
import { SearchFormNameOnlyComponent } from '../../../shared/ui/search-form/search-form-name-only/search-form-name-only.component';
import { CollectionDisplaySearchFormComponent } from '../../user-panel/collection/components/collection-display/collection-display-search-form/collection-display-search-form.component';
import { SearchQuery } from '../../user-panel/collection/models/search-query.model';
import { HomeSearchFormComponent } from '../components/home-search-form/home-search-form.component';
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
    ],
    providers: [
        SearchFormHomeService,
        { provide: SearchFormService, useExisting: SearchFormHomeService },
        HomeSearchResultsService,
    ],
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  @ViewChild('filterDrawer') filterDrawer!: MatDrawer;
  private _breakpointObserverService = inject(BreakpointObserverService);
  private _searchFormService = inject(SearchFormHomeService);
  private _homeSearchResultService = inject(HomeSearchResultsService);

  readonly isTablet = this._breakpointObserverService.isTablet;
  readonly isDesktop = this._breakpointObserverService.isDesktop;

  searchForm = this._searchFormService.searchForm;

  search() {
    const searchQuery: SearchQuery = this._searchFormService.getSearch();
    this._homeSearchResultService.searchCards(searchQuery);
  }

  toggleFilterDrawer() {
    this.filterDrawer.toggle();
  }

  scrollToDrawer() {
    const drawerContainer = document.getElementById('drawerContainer');
    if (drawerContainer) {
      drawerContainer.scrollIntoView({behavior: 'smooth', block: 'nearest'});
    }
  }

}
