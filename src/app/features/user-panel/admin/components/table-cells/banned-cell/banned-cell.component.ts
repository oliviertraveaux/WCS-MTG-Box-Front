import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { UserInfo } from '../../../../../../shared/user/models/user-info.interface';

@Component({
    selector: 'app-banned-cell',
    standalone: true,
    imports: [CommonModule, MatFormFieldModule, MatOptionModule, MatSelectModule],
    templateUrl: './banned-cell.component.html',
    styleUrls: ['./banned-cell.component.scss'],
})
export class BannedCellComponent {
    @Input({ required: true }) user!: UserInfo;
}
