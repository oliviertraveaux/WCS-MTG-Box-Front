import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { OfferCardComponent } from '../../offers-received/components/offer-card/offer-card-component';

@Component({
    selector: 'app-filter-offer-bar',
    standalone: true,
    imports: [CommonModule, OfferCardComponent, MatChipsModule],
    templateUrl: './filter-offer-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterOfferBarComponent {
    @Output() filterByPending = new EventEmitter();
    @Output() filterByAccepted = new EventEmitter();
    @Output() resetFilter = new EventEmitter();
    @Input() confirmChipText: string = 'Accepted';

    onFilterByPending(): void {
        this.filterByPending.emit();
    }
    onFilterByConfirmed(): void {
        this.filterByAccepted.emit();
    }
    resetFilters(): void {
        this.resetFilter.emit();
    }
}
