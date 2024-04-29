import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BreakpointObserverService } from '../../../services/breakpoint-observer.service';
import { SearchFormService } from '../../../services/search-form/search-form.service';

@Component({
    selector: 'app-search-form-name-only',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    templateUrl: './search-form-name-only.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormNameOnlyComponent {
    @Output() search = new EventEmitter();
    @Output() toggleFilterDrawer = new EventEmitter();

    private _searchFormService = inject(SearchFormService);
    private _breakpointObserverService = inject(BreakpointObserverService);

    readonly isTablet = this._breakpointObserverService.isTablet;
    searchForm = this._searchFormService.searchForm;
}
