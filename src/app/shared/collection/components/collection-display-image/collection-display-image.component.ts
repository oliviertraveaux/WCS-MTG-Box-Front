import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { CollectionAddCardSearchFormComponent } from '../../../../features/user-panel/collection/components/collection-add-card/collection-add-card-search-form/collection-add-card-search-form.component';
import { CollectionAddCardSearchResultComponent } from '../../../../features/user-panel/collection/components/collection-add-card/collection-add-card-search-result/collection-add-card-search-result.component';
import { SearchFormComponent } from '../../../ui/search-form/search-form.component';
import { UserCard } from '../../models/user-card.model';
import { CollectionDisplayListComponent } from '../collection-display-list/collection-display-list.component';

@Component({
    selector: 'app-collection-display-image',
    standalone: true,
    imports: [
        CommonModule,
        CollectionAddCardSearchResultComponent,
        MatPaginatorModule,
        SearchFormComponent,
        CollectionAddCardSearchFormComponent,
        CollectionDisplayListComponent,
    ],
    templateUrl: './collection-display-image.component.html',
    styleUrls: ['./collection-display-image.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDisplayImageComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @Input() cards$: Observable<UserCard[]> = of([]);
    @Output() cardToRemove = new EventEmitter<string | number>();

    ngOnInit(): void {}

    onDelete(uniqueId: number) {
        this.cardToRemove.emit(uniqueId);
    }
}
