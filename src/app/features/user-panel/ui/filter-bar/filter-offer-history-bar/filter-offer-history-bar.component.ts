import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-filter-offer-history-bar',
    standalone: true,
    imports: [CommonModule, MatChipsModule, TranslateModule],
    templateUrl: './filter-offer-history-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterOfferHistoryBarComponent {
    @Output() filterByMade = new EventEmitter();
    @Output() filterByReceived = new EventEmitter();
    @Output() resetFilter = new EventEmitter();

    onFilterByMade(): void {
        this.filterByMade.emit();
    }
    onFilterByReceived(): void {
        this.filterByReceived.emit();
    }
    resetFilters(): void {
        this.resetFilter.emit();
    }
}
