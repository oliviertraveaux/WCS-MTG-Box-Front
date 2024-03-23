import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { UserCard } from '../../../../../../shared/collection/models/user-card.model';
import { GetQualityClassPipe } from '../../../../../../shared/collection/pipes/get-quality.pipe';
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
    ],
    templateUrl: './collection-display-search-result.component.html',
    styleUrls: ['./collection-display-search-result.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDisplaySearchResultComponent {
    @Input({ required: true }) card!: UserCard;
    @Output() cardDeleted = new EventEmitter<number>();

    deleteCard(userCardId: number | undefined) {
        this.cardDeleted.emit(userCardId);
    }
}
