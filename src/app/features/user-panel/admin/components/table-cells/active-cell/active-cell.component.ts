import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
    selector: 'app-active-cell',
    standalone: true,
    imports: [CommonModule, MatChipsModule],
    templateUrl: './active-cell.component.html',
    styleUrls: ['./active-cell.component.scss'],
})
export class ActiveCellComponent implements OnInit {
    @Input({ required: true }) isActive!: boolean;
    chipText!: string;
    chipClass!: string;

    ngOnInit(): void {
        this.chipText = this.isActive ? 'Active' : 'Inactive';
        this.chipClass = this.isActive ? 'active' : 'inactive';
    }
}
