import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserRole } from '../../../../../../shared/user/enums/user-role.enum';
import { UserInfo } from '../../../../../../shared/user/models/user-info.interface';

@Component({
    selector: 'app-role-cell',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatSelectModule],
    templateUrl: './role-cell.component.html',
    styleUrls: ['./role-cell.component.scss'],
})
export class RoleCellComponent {
    @Input({ required: true }) user!: UserInfo;
    roles = Object.values(UserRole);
}
