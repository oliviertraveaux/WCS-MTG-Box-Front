import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [CommonModule, MatPaginatorModule],
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
    @Input() length: number = 0;
    @Input() pageSize: number = 10;
    @Input() pageIndex: number = 0;
    @Input() pageSizeOptions: number[] = [10, 20, 50];
    @Output() page = new EventEmitter<{ startIndex: number; endIndex: number }>();

    handlePageEvent(event: PageEvent) {
        const startIndex = event.pageIndex * event.pageSize;
        const endIndex = startIndex + event.pageSize;
        this.page.emit({ startIndex, endIndex });
    }
}
