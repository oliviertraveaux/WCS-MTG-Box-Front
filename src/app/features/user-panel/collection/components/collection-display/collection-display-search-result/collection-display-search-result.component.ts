import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { CollectionDisplayImageComponent } from '../../../../../../shared/collection/components/collection-display-image/collection-display-image.component';
import { UserCard } from '../../../../../../shared/collection/models/user-card.model';
import { GetQualityClassPipe } from '../../../../../../shared/collection/pipes/get-quality.pipe';
import { GetTruncateTextPipe } from '../../../../../../shared/collection/pipes/get-truncate-text.pipe';
import { GetUserCardImgPipe } from '../../../shared/pipes/get-user-card-img.pipe';
import { GetUserCardNamePipe } from '../../../shared/pipes/get-user-card-name.pipe';

@Component({
    selector: 'app-collection-display-search-result',
    standalone: true,
    imports: [
        CommonModule,
        GetUserCardImgPipe,
        GetUserCardNamePipe,
        TranslateModule,
        MatIconModule,
        GetQualityClassPipe,
        MatButtonModule,
        MatCheckboxModule,
        CollectionDisplayImageComponent,
        GetTruncateTextPipe,
        MatBadgeModule,
        MatTooltipModule,
    ],
    templateUrl: './collection-display-search-result.component.html',
    styleUrls: ['./collection-display-search-result.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDisplaySearchResultComponent {
    @Input({ required: true }) card!: UserCard;
    @Input() selection!: SelectionModel<UserCard>;
    @Input() hasRemoveButton: boolean = true;
    @Output() updateSelection = new EventEmitter<UserCard[]>();
    @Output() cardToRemove = new EventEmitter<number>();

    toggleSelection(card: UserCard) {
        this.selection.toggle(card);
        this.updateSelection.emit(this.selection.selected);
    }

    onDelete(uniqueId: number | undefined): void {
        this.cardToRemove.emit(uniqueId);
    }
}
