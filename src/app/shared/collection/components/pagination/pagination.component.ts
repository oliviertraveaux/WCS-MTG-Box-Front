import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [CommonModule, MatPaginatorModule],
    templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnChanges {
    @Input() length: number = 0;
    @Input() pageSize: number = 5;
    @Input() pageIndex: number = 0;
    @Input() pageSizeOptions: number[] = [5, 10, 20, 50];
    @Input() hidePageSize: boolean = false;
    @Input() showFirstLastButtons: boolean = true;
    @Input() resetPagination: boolean = false;
    @Output() page = new EventEmitter<{ startIndex: number; endIndex: number }>();

    @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['resetPagination'] && this.paginator) {
            this.paginator.firstPage();
        }
    }

    handlePageEvent(event: PageEvent) {
        const startIndex = event.pageIndex * event.pageSize;
        const endIndex = startIndex + event.pageSize;
        this.page.emit({ startIndex, endIndex });
    }
}
